import { Server } from "socket.io";
import http from "https";
import { Socket } from "socket.io-client";

let io;
export const initSocket = (server : http.Server)=>{
    io = new Server(server , {
        cors:{origin:"*"}
    })

   

 return io;
}
