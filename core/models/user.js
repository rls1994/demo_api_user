const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"User Name is Required"] },
  email:{ type: String, required: [true,"User Email is Required"] },
  phone:{ type: String, required: [true,"User Phone Number is Required"] },
  address:{ type: String, default: null },
  password_hash:{ type: String, required: [true,"User Password is Required"] },
  city:{ type: String, default: null },
  gender:{ type: String, default: null }
});


module.exports = mongoose.model('users', Schema)