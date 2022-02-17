const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {

      name:{
        type: String, // "Mozzarella", "Pep..."
        unique: true,
      },
      calories: Number, //calories per 100g
      
      
      // typeOfIngredient: String //enum
// alami","mozarella","peperoni","ham","beef","paprika","tomato","olives"

          
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("Ingredients", ingredientSchema);

module.exports = Ingredients;
