import Contact from "../models/Contact.js";

export const createContact = async(req,res)=>{

  try{

    const {name,email,phone,business,message} = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      business,
      message
    });

    res.status(201).json({
      success:true,
      message:"Inquiry submitted successfully"
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};



export const getContacts = async(req,res)=>{

  try{

    const contacts = await Contact
      .find()
      .sort({createdAt:-1});

    res.json({
      success:true,
      data:contacts
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};



export const deleteContact = async(req,res)=>{

  try{

    const contact = await Contact.findById(req.params.id);

    if(!contact){
      return res.status(404).json({
        success:false,
        message:"Inquiry not found"
      });
    }

    await contact.deleteOne();

    res.json({
      success:true,
      message:"Inquiry deleted"
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};