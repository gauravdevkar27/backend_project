import express from 'express'
import cors from "cors"            // A middleware to handle Cross-Origin Resource Sharing, allowing your API to be accessed from different domains.
import cookieParser  from 'cookie-parser'  //cookie-parser is a middleware 


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)

//https://localhost:8000/api/v1/users/register

export {app}