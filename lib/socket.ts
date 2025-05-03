import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';


let socket: Socket| null;

export const initSocket = () => {
  if(!socket){
    //connect to the ssocket
    socket = io(process.env.SOCKETIO_URL || 'http://localhost:3001',{
      reconnectionDelayMax: 10000,
    })


    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket?.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
  }
  
  return socket
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
