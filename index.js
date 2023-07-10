const express=require("express")
const mongoose=require("mongoose")
const { connection } = require("./Config/db")
const UserRouter = require("./Routes/user.router")
const RetaurentRouter = require("./Routes/restaurent.router")
const OrderRouter = require("./Routes/order.router")

require("dotenv").config()

const app=express()

app.use(express.json())

app.use("/api",UserRouter)

app.use("/api",RetaurentRouter)

app.use("/api",OrderRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connect to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("connect to server")
})