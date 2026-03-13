import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
{
  name:{
    type:String,
    required:true,
    trim:true,
    minlength:2,
    maxlength:100
  },

  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true
  },

  phone:{
    type:String,
    trim:true
  },

  business:{
    type:String,
    trim:true,
    maxlength:200
  },

  message:{
    type:String,
    required:true,
    trim:true,
    minlength:10,
    maxlength:2000
  },

  status:{
    type:String,
    enum:["new","read"],
    default:"new"
  }

},
{timestamps:true}
);

export default mongoose.model("Contact",contactSchema);