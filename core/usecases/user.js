const model = require("./../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const addUser = async (user) => {
  user._id = new mongoose.Types.ObjectId();
  return (await new model(user).save()).toObject();  
}

const getUsers =  async (filters) => {
    return await model.find(filters).exec()
  }


  module.exports = {
      addUser,
      getUsers
  }




//compare password
// const comparePassword = async (id,password) => {
//   let res =  await model.findOne({_id:id}).select("password_hash").exec();
//   passwordRes =  bcrypt.compareSync(password, res.password_hash);
//   return passwordRes;
// }
