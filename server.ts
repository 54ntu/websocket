import 'dotenv/config'
import app from "./src/app";
import envConfig from './src/config/config';
import connectdb from './src/config/dbconfig';
import {Server} from 'socket.io'



connectdb()
    .then(() => {
        app.listen(envConfig.port, () => {
            console.log(`server is listening at port ${envConfig.port}`)
        })
    })
    .catch(() => {
        console.log("error while connecting datbase")
    }
    )