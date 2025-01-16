const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({
  name : {
    type : 'string' , 
    required : true
  },
  instructions : {
    type : 'string' 
  },
  owner : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ingredients : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }
}, {
  timestamps: true // createdAt , updatedAt
})

const Recipe = mongoose.model('Recipe' , recipeSchema)
module.exports = Recipe