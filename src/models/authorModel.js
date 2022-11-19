const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
   fname: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      minlength: 2,
      maxlength: 20,
      required: "Fname is required",
     // match:  /^\\w+$/

   },
   lname: {
      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      minlength: 2,
      maxlength: 20,
      required: "Lname is required",
     // match: /^\\w+$/
   },
   title: {
      type: String,
      trim: true,
      required: "Title is required",
      enum: ["Mr", "Mrs", "Miss"],
   },
   email: {

      type: String,
      trim: true,
      lowercase: true,
      uppercase: true,
      unique: true,
      required: 'Email address is required',
      match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   password: {
      type: String,
      trim: true,
      required: "Password is required",
     // match: /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/

   }

}, { timestamps: true });
module.exports = mongoose.model('Author', authorSchema)
