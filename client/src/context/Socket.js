import { io } from "socket.io-client";


const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],reconnection: true, 
  reconnectionAttempts: 5, 
  reconnectionDelay: 3000, 
 
});

socket.on("connect", () => {
  console.log("Connected to WebSocket:", socket.id);
});


socket.on("message", (data) => {
  console.log("Message from server:", data);
});

export default socket;
