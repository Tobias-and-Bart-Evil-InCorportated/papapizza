const { Schema, model } = require("mongoose");


// as a user, Luis, you can create ingredients in this collection
// but , when you come to the app, we will also have some options ready for you


// 4m.
// 4m. 

// 13:50

const ingredientSchema = new Schema(
  {

      name:{
        type: String, // "Mozzarella", "Pep..."
       
      },
      calories: Number, //calories per 100g
      
      
      // typeOfIngredient: String //enum

// alami","mozarella","peperoni","ham","beef","paprika","tomato","olives"
 

          
    },
  {
    
    timestamps: true,
  }
);

const Ingredients = model("ingredients", ingredientSchema);

module.exports = Ingredients;
