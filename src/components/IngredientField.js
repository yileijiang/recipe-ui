import React, { useState } from 'react'
import Button from './Button'


const IngredientField = ({ ingredient, ingredients, setIngredients }) => {
  const [ newName, setNewName ] = useState(`${ingredient.name}`)
  const [ newQuantity, setNewQuantity ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    ingredient.name = event.target.value
    setIngredients(ingredients.map((ing, i) => i === ingredient.id ? ingredient : ing))
  }

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value)
    ingredient.quantity = event.target.value
    setIngredients(ingredients.map((ing, i) => i === ingredient.id ? ingredient : ing))
  }

  const deleteIngredient = () => {
    const ingredientFilter = ingredients.filter(ing => ing.id !== ingredient.id)
    setIngredients(ingredientFilter)
  }

  return (
    <div>
      new Ingredient
      <input value={newName} onChange={handleNameChange}/>
      <input value={newQuantity} onChange={handleQuantityChange}/>
      <Button text='delete Ingredient' onClick={deleteIngredient}/>
    </div>
  )
}

export default IngredientField