import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./src/models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existingAdmin = await Admin.findOne({
  email: "yash@bynix.com"
});

if (existingAdmin) {
  console.log("Admin already exists");
  process.exit();
}

const password = await bcrypt.hash("yash123", 10);

await Admin.create({
  email: "yash@bynix.com",
  password: password
});

console.log("Admin created");

process.exit();