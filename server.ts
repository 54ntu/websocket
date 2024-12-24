import 'dotenv/config'
import app from "./src/app";
import envConfig from './src/config/config';
import connectdb from './src/config/dbconfig';
import { Server } from 'socket.io'

//post --on
//get--emit
//request --socket
//api--event    
let io: Server;
connectdb()
function serverConnect() {
    try {
        const server = app.listen(envConfig.port, () => {
            console.log(`server is listening at port ${envConfig.port}`)
        })

        io = new Server(server)
    } catch (error) {
        console.log(`error while starting server ${error}`)

    }

}

serverConnect();

function getSocketIo() {
    if (!io) {
        throw new Error("socketio is not defined or available..!!")

    }

    return io;
}


export { getSocketIo };