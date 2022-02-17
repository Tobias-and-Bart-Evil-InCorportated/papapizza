const { Schema, model } = require("mongoose");


const ingredientSchema = new Schema(
  {
      ingredient: String,
          
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("ingredients", ingredientSchema);

module.exports = Ingredients;
