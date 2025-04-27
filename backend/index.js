import express from 'express'
import { createServer } from "http"
import { Server } from 'socket.io'
import connectDB from './connection.js'
import userRouter from './routes/user.router.js'
import friendsRouter from './routes/friends.router.js'
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from 'dotenv';
dotenv.config();
 

import { EventEmitter } from 'events';  // Importing the EventEmitter class

// Set max listeners globally for EventEmitter to avoid the warning
EventEmitter.defaultMaxListeners = 200;

const app = express()
const server = createServer(app)
const port=process.env.PORT || 8000
const io = new Server(server, {
    cors: {
        origin: `${process.env.CLIENT_URL}`,

        credentials:true,

    }
})


connectDB()
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: `${process.env.CLIENT_URL}`, 
    methods: 'GET,POST,PUT,DELETE,PATCH', 
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, 
    optionsSuccessStatus: 200, 
}));

app.use("/user", userRouter)
app.use("/friend", friendsRouter)
// At the beginning of your backend file

io.on("connection", (socket) => {

    socket.on("joinroom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    })


    socket.on("sendMessage", ({ room, message,reciver }) => {
        socket.to(reciver).emit("receiveMessage", room,message);
        
    })


    io.on("disconnect", (socket) => {
        
    })
})

server.listen(port, () => {
    console.log('http://localhost:8000')
})