const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
<<<<<<< HEAD
      name:{
        type: String,
        unique: true,
      },
      calories: Number,
    },
=======

    name: {
      type: String, 
      unique: true,
    },
    calories: Number, 
  },
>>>>>>> b947ebe8ec892062944e06be72d9e28c79142e99
  {
    
    timestamps: true,
  }
);

const Ingredients = model("Ingredients", ingredientSchema);

module.exports = Ingredients;
