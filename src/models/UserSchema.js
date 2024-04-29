const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: { type: String, trim: true, unique: true },
    email: { type: String, trim: true, unique: true },
    password: { type: String },
    profilePic: { type: String, default: "/images/profilePic.jpeg" },
  },
  { timestamps: true }
);

let User = mongoose.model("User", UserSchema);
module.exports = User;
