import mongoose from "mongoose";
export const Mongo=()=>{
const con=()=>{

    console.log("mongodbconnected");
}
const error=(err)=>{
    console.log("there is error in the connection",err);
}
mongoose.connect("mongodb://Adarsh14:adarsh1442005@cluster0-shard-00-00.nc0yl.mongodb.net:27017,cluster0-shard-00-01.nc0yl.mongodb.net:27017,cluster0-shard-00-02.nc0yl.mongodb.net:27017/twowaychat?ssl=true&replicaSet=atlas-e016bb-shard-0&authSource=admin&appName=Cluster0")

.then(con)
.catch(error);}


