import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true,
    trim:true
  },

  slug:{
    type:String,
    required:true,
    unique:true
  },

  excerpt:{
    type:String,
    required:true
  },

  content:{
    type:String,
    required:true
  },

  category:{
    type:String,
    required:true
  },

  metaTitle:{
    type:String,
    required:true
  },

  metaDescription:{
    type:String,
    required:true
  },

  imageUrl:{
    type:String,
    required:true
  },

  imagePublicId:{
    type:String
  }

},{
  timestamps:true
});

export default mongoose.model("Blog",blogSchema);