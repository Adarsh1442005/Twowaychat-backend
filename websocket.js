import {Server} from "socket.io";

export const Sock=(serv)=>{
const Io=new Server(serv);
const con=(Socket)=>{
    console.log("client connected designated socket id is :",socket.id);
    socket.on("message",(data)=>{
          console.log("received message",data);
          Io.emit("message",data);



    });
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });



};
Io.on("connection",con);}

