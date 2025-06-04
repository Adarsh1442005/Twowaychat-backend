import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const schema={
email:{type:String,required:true},
username:{type:String , required:true},
password:{type:String ,required:true}



};
const userschema=new mongoose.Schema(schema);
const User=mongoose.model("User",userschema);
export default User;