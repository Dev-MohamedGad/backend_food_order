import express from 'express'
import cors from "cors"
import "dotenv/config"
import dbConnection from '../db/dbConnection'
const app =express()
app.use(express.json())
app.use(cors())
dbConnection()
app .listen(5000, ()=>{
    console.log("server started on localhost:5000");
    
})