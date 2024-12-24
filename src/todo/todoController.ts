import { Socket } from "socket.io";
import { getSocketIo } from "../../server";
import TodoModel from "./todoModel";



class Todo {
    private io = getSocketIo();
    constructor() {
        this.io.on("connection", (socket: Socket) => {
            console.log('new client is connected.!')
            socket.on("addTodo", (data) => this.handleAddTodo(socket, data))
        })
    }


    private async handleAddTodo(socket: Socket, data: any) {
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
    }

}


export default new Todo;