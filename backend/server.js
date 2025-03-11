import express from "express"
import cors from "cors"
import { connectDb } from "./Config/db.js"
import 'dotenv/config'
import projectRouter from "./routes/projectRoute.js"


//app config

const app = express()
const port = process.env.PORT||4000;

//middleware

app.use(express.json())
app.use(cors())

//db connection
connectDb();


app.use("/api/projects",projectRouter)


app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log("Running")
})

