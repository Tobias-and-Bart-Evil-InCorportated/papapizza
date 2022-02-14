const { Schema, model } = require("mongoose");


const ingredientSchema = new Schema(
  {
      name: String,
      type: String
    
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("ingredients", ingredientSchema);

module.exports = Ingredients;
