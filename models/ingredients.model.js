const { Schema, model } = require("mongoose");


const ingredientSchema = new Schema(
  {
      toppings: String,
      cheese: String,
      seasoning: String,

          
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("ingredients", ingredientSchema);

module.exports = Ingredients;
