import mongoose from "mongoose";
import { ITodo, Status } from "./todoTypes";

const todoSchema = new mongoose.Schema<ITodo>({
    task: String,
    deadline: String,
    status: {
        type: String,
        enum: [Status.completed, Status.pending],
        default: Status.pending
    }
})


const Todo = mongoose.model("Todo", todoSchema)
export default Todo;