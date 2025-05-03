import next from "next";
import express from "express";
import http from "http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "development";

const app = next({ dev });
const handler = app.getRequestHandler();
const userSocketMap: any = {}; // userId -> socket.id

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: '*', // adjust if needed
      methods: ['GET', 'POST'],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    //Register User
    socket.on("register", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    //Private Message
    socket.on("private-message", ({ toUserId, message }) => {
      const toSocketId = userSocketMap[toUserId];
      if (toSocketId) {
        io.to(toSocketId).emit("private-message", {
          message,
          
          from: socket.id,
        });
      } else {
        console.log(`User ${toUserId} is not connected`);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of Object.entries(userSocketMap)) {
        if (socketId === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      console.log("Socket disconnected:", socket.id);
    });
  });
  server.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
  });
});
