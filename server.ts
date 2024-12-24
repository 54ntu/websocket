import 'dotenv/config'
import app from "./src/app";
import envConfig from './src/config/config';
import connectdb from './src/config/dbconfig';
import { Server } from 'socket.io'

//post --on
//get--emit
//request --socket
//api--event    

connectdb()
    .then(() => {
        const server = app.listen(envConfig.port, () => {
            console.log(`server is listening at port ${envConfig.port}`)
        })

        const io = new Server(server)

        //if we use reactjs,next js frontend then we need to configure the cors as well

        // const io=    new Server(server,{
        //     cors:{
        //         origin:"http://localhost:5173"
        //     }
        //         })

        io.on("connection", (socket) => {
            // console.log(socket.id)
            socket.on('haha', (data) => {
                console.log(data)
                socket.emit("suniraxu", {
                    message: "data receive gare hoiiii...!!"
                })
            })
            console.log("someone connected(client)")
        })
    })
    .catch(() => {
        console.log("error while connecting datbase")
    }
    )