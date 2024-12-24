import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import TodoModel from "./todoModel";
import { isValidObjectId } from "mongoose";
import { Status } from "./todoTypes";



class Todo {
    private io = getSocketIo();
    constructor() {
        this.io.on("connection", (socket: Socket) => {
            console.log('new client is connected.!')
            socket.on("addTodo", (data) => this.handleAddTodo(socket, data))
            socket.on("deleteTodo", (data) => this.handleDeleteTodo(socket, data))
            socket.on("getTodos", () => this.handleFetchTodo(socket))
            socket.on('updateTodo', (data) => this.handleUpdateTodo(socket, data))
        })
    }


    private async handleAddTodo(socket: Socket, data: any) {
        try {
            const { task, deadLine, status } = data
            console.log(`task ${task} deadline ${deadLine} status ${status}`)
            if (!task || !deadLine || !status) {
                socket.emit("todo-response", {
                    status: 'error',
                    message: "all fields are required.!"
                });
                return;
            }

            const todo = await TodoModel.create({
                task,
                deadLine,
                status

            })

            socket.emit("todo-response", {
                status: "success",
                data: todo
            })
        } catch (error) {

            socket.emit("todo-response", {
                status: 'error',
                message: 'error occurred.!'
            })

        }
    }



    private async handleDeleteTodo(socket: Socket, data: { id: string }) {
        try {
            const { id } = data
            console.log(`data is ${data}`)
            if (!isValidObjectId(id)) {
                socket.emit("todo-response", {
                    status: 'error',
                    message: "invalid object id"
                });
                return;
            }

            const deletedTodo = await TodoModel.findByIdAndDelete(id)
            if (!deletedTodo) {
                socket.emit("todo-response", {
                    status: "error",
                    message: "todo not found.!"
                });
                return;
            }
            const todos = await TodoModel.find()
            socket.emit('todo-upated', {
                status: "success",
                data: todos
            })
        } catch (error) {
            socket.emit('todo-response', {
                status: "error",
                message: 'error occurred while deleting.!'
            })

        }

    }



    private async handleFetchTodo(socket: Socket) {
        try {
            const todos = await TodoModel.find()
            console.log(todos)
            socket.emit("todo-response", {
                status: 'success',
                data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {
                status: 'error',
                message: "erro while fetching todos.!"

            })
        }
    }



    private async handleUpdateTodo(socket: Socket, data: { id: string, status: Status }) {
        try {
            const { id, status } = data
            if (!isValidObjectId(id)) {
                socket.emit("todo-response", {
                    status: "error",
                    message: "invalid objectid"
                });
                return;
            }

            const updatedData = await TodoModel.findByIdAndUpdate(id, { status }, { new: true })
            if (!updatedData) {
                socket.emit("todo-response", {
                    status: "error",
                    message: "error while updating the todos"
                })
            }
            const todos = await TodoModel.find()
            socket.emit("todo-updated", {
                status: "success",
                message: "todo updated successfully...!!!",
                data: todos
            })
        } catch (error) {
            socket.emit("todo-response", {

                status: "error",
                message: "error while updating todos..!!!",
                error
            })
        }
    }

}


export default new Todo;