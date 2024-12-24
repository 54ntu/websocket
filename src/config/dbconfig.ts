import mongoose from "mongoose";
import envConfig from "./config";



const connectdb = async () => {
    try {

        const connectionInstance = await mongoose.connect(envConfig.mongodb_url as string)
        // console.log(connectionInstance)
        if (connectionInstance) {
            console.log('database connected successfully...!!!')
        }

    } catch (error) {
        console.log(error)
        process.exit(1);

    }

}


export default connectdb;