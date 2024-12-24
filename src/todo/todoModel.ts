import mongoose from "mongoose";
import { ITodo, Status } from "./todoTypes";

const todoSchema = new mongoose.Schema<ITodo>({
    task: String,
    deadLine: String,
    status: {
        type: String,
        enum: [Status.completed, Status.pending],
        default: Status.pending
    }
})


const TodoModel = mongoose.model("TodoModel", todoSchema)
export default TodoModel;