const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()  
    res.render('users/index.ejs', { users }) 
  } catch (error) {
    console.log(error)
    res.redirect('/')  
  }
})


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const recipes = await Recipe.find({ owner: user._id })
    res.render('users/show.ejs', { user, recipes }) 
  } catch (error) {
    console.log(error)
    res.redirect('/')  
  }
})


module.exports = router
