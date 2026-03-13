import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },

  role:{
    type:String,
    required:true,
    trim:true
  },

  imageUrl:{
    type:String,
    required:true
  },

  imagePublicId:{
    type:String,
    required:true
  },

},{timestamps:true})

export default mongoose.model("Team",teamSchema)