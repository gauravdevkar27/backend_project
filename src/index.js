import dotenv from "dotenv"         //brings dotenv packages
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    application.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})















/*
import express from 'express'
const app = express()

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            app.on("error", () => {
                console.log("Error: ", error);
                throw err
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listing on port ${process.env.PORT}`);
            })
        }
        catch (error) {
            console.error("ERROR: ", error)
            throw err
        }
    })()
*/        