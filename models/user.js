const mongoose = require('mongoose')
const foodSchema = new mongoose.Schema({
name: {
  type: 'string',
  require: true 
},
})

const userSchema = new mongoose.Schema({
  username : {
    type : 'string' , 
    required : true
  },
  password : {
    type : 'string' , 
    required : true
  },
  food: [foodSchema]

}, {
  timestamps: true // createdAt , updatedAt
})

const User = mongoose.model('User' , userSchema)
module.exports = User 