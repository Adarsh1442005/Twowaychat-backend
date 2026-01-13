import express from "express";
// import mongoose from "mongoose";
import User from "./database.js";
import { Mongo } from "./databaseconnect.js";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";
import { EmailVerify } from "./mailverify.js";
const app=express();
app.use(cors());


app.use(express.json());
Mongo();
// mongoose.connect("mongodb+srv://aadi:Adarsh1442005@cluster0.nc0yl.mongodb.net/twowaychat?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true });
console.log("mongodbconnected");
   const port = process.env.PORT || 8097;


app.post("/",(req,res)=>{
    console.log(req.params.name);

 res.send({"message":"server start adarsh"});


});
let uscheck;
let otpus={};

const userregistration=async (req,res)=>{
    try{
    const {email,username,password}=req.body;
    const newuser=new User({email,username,password});
    const user=await User.findOne({email});
    uscheck=newuser;
    const {otpcheck}=await EmailVerify({email});
    otpus[email]=otpcheck;
    
    res.json({success:1 ,message :"otp send to your registerd mail"});
//     if(!user){
//     await newuser.save();
// res.json({success :1,message:"User registered successfully"})

// }
// else{

//     res.json({success:0,message:"User with the same email-id already exist enter new email-id"});
// }
    
    }
    catch{

        res.json({success: 0,message:"try again after some time"});
    }


}
const verify=async (req,res)=>{
const {otp,email}=req.body;
//console.log(otpverify);
if(otp===otpus[email]){
   await uscheck.save();
   delete otpus[email];
   res.json({message:"Your account has created successfully"});
}
else{
    res.json({message:"wrong otp entered"});
}


}


const loginuser=async(req,res)=>{
    const{email,password}=req.body;
    if(await User.findOne({email,password})){
        res.json({code:1,message:"login successfully"});
    }
    else{
           res.json({code:0,message:"given mail-id  does not exists or entered password is wrong please verify it"});

    }



}
const logoutuser=async(req,res)=>{
const {email}=req.body;
const del=await User.findOneAndDelete({email})

if(del){
res.json({success:1,message:"you have loggedout successfully"});
}
else{
    res.json({message:"you are already not exist please login yourself for allow chat !!"});
}






}

app.post("/registration",userregistration);
app.post("/login",loginuser);
app.post("/logout",logoutuser);
app.post("/verify",verify);


const server=http.createServer(app);

const Io = new Server(server, {
    cors: {
        origin: "https://duallink.onrender.com",
        methods: ["GET", "POST"],
    },
});
const users={};

const con=(socket)=>{
    console.log("client connected designated socket id is :",socket.id);
    const register=({userid})=>{
        console.log(userid);
        if(users[userid]){
            Io.to(socket.id).emit("fail",{message:"a user already connected with that user id please enter new one!!"});
            return;
        }
        users[userid]=socket.id;
        Io.to(socket.id).emit("confirm",);



    };
    socket.on("register",register);
    const priv=({recipientId,message,email})=>{
        console.log("receiptent id is ",recipientId)
        if(users[email]){
           if(users[recipientId]){
            const send={text:message.text,sender:"client"}
             Io.to(users[recipientId]).emit("message",send);


           }
           else{
            Io.to(users[email]).emit("receivererr",{code :0,message:"entered receiver id is not online activate yet"})
           }}
           else{
            Io.to(socket.id).emit("usererr",{code:0, message:"please register yourself via your regstered email!!then start chating"})
           }




    };
    socket.on("privatemessage",priv);
    socket.on("disconnect", () => {
    Object.keys(users).forEach((key) => {
        if (users[key] === socket.id) {
            delete users[key]; // Remove disconnected user
        }
    });
});


    
};
 Io.on("connection",con);
 server.listen(port, () => {
    console.log("Server running on port 8087");
});
