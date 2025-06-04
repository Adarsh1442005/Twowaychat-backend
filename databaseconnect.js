import mongoose from "mongoose";
export const Mongo=()=>{
const con=()=>{

    console.log("mongodbconnected");
}
const error=(err)=>{
    console.log("there is error in the connection",err);
}
mongoose.connect("mongodb+srv://aadi:1442005@cluster0.nc0yl.mongodb.net/twowaychat?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(con)
.catch(error);}


