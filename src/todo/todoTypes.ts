export enum Status {
    completed = "completed",
    pending = "pending"
}


export interface ITodo {
    task: string,
    deadLine: string,
    status: Status
}