/* MODULES IMPORTS */
import { Server } from 'socket.io'
import http from 'node:http'
import express from 'express'

/* Initialize an Express app and creating an
HTTP server using the declared application */
const app = express()
const server = http.createServer(app)
// Initializing the socket with CORS configuration
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  }
})
// For retrieving socket ID of a given receiver
export const getReceiverSocketId = (receiverId: string): string | null => {
  return userSocketMap[receiverId] || null
}
// A mapping object to store user IDs associated with their respective socket IDs
const userSocketMap: { [key: string]: string } = {} // { userId: socketId }
// Listening for new WebSocket connections
io.on("connection", (socket)=> {
  console.log(`A user connected: ${socket.id}`)
  // Retrieving userId from the socket handshake query (sent by the client)
  const userId = socket.handshake.query.userId as string
  // If userId is valid, storing the mapping of userId to socket.id
  if(userId && typeof userId === 'string') {
    userSocketMap[userId] = socket.id
  }
  // Emit the list of online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap))
  // Listening for the "disconnect" event when a user disconnects
  socket.on("disconnect", ()=> {
    console.log(`User disconnected: ${socket.id}`)
    // Finding the user id associated with the disconnected socket id
    const disconnectedUserId = Object.keys(userSocketMap)
      .find(key => userSocketMap[key] === socket.id)
    // If any, deleting the id from the userSocketMap
    if(disconnectedUserId) {
      delete userSocketMap[disconnectedUserId]
    }
    // Emitting the updated list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})

export { app, io, server }