import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    mobile:String,
    email:String,
    password:String,
    usertype:{
        type:Number,default:1
    }
  });

  const userModel = mongoose.model("users", userSchema);

  export default userModel;