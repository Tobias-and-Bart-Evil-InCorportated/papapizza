const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
      name:{
        type: String,
        unique: true,
      },
      calories: Number,
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("Ingredients", ingredientSchema);

module.exports = Ingredients;
