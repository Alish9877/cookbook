const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredient')

router.get('/new', (req, res) => {
  res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
  try {
    const { name, instructions, ingredients } = req.body
    const ingredientNames = ingredients.split(',').map(name => name.trim())
    const ingredientObjects = await Promise.all(ingredientNames.map(async (name) => {
      let ingredient = await Ingredient.findOne({ name })
      if (!ingredient) {
        ingredient = await Ingredient.create({ name })
      }
      return ingredient._id
    }))
    const newRecipe = new Recipe({
      name,
      instructions,
      owner: req.session.user._id,
      ingredients: ingredientObjects
    })
    await newRecipe.save()
    res.redirect('/recipes')
  } catch (error) {
    console.error(error)
    res.redirect('/recipes/new')
  }
})

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id }).populate('ingredients')
    res.render('recipes/index.ejs', { recipes })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients')
    res.render('recipes/show', { recipe })
  } catch (error) {
    console.error(error)
    res.redirect('/recipes')
  }
})

router.delete('/:recipeId', async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.recipeId })
    res.redirect('/recipes')
  } catch (error) {
    console.error(error)
    res.redirect('/recipes')
  }
})

router.get('/:recipeId/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render('recipes/edit', { recipe })
  } catch (error) {
    console.error(error)
    res.redirect('/recipes')
  }
})

router.put('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
    recipe.name = req.body.name
    recipe.instructions = req.body.instructions
    await recipe.save()
    res.redirect(`/recipes/${recipe._id}`)
  } catch (error) {
    console.error(error)
    res.redirect('/recipes')
  }
})

module.exports = router
