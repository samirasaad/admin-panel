const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name:String,
  phone:String,
  country:String,
  email:{
    type:String,
    unique:false},
  password:String,
  role:String
});
module.exports = mongoose.model('users',userSchema);
