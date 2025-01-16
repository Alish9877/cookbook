const mongoose = require('mongoose')
const ingSchema = new mongoose.Schema({
  name : {
    type : 'string' , 
    required : true
  }
}, {
  timestamps: true // createdAt , updatedAt
})

const Ingredient = mongoose.model('Ingredient' , ingSchema)
module.exports = Ingredient