const { Schema, model } = require("mongoose");


const pizzaSchema = new Schema(
  {
      name: {
        type: String,
        required: [true, 'name of a pizza is required.'],
        unique: true,
      },
      tags: [String],
      toppings: [String],
      sauces: [String],
      baseCheese: String,
      dough:{
        type: String,
        required: true,
        enum: ["neapolitian", "gluten free","vegie dough"],
        default: "neapolitian",
      },

      
    
    },
  {
    
    timestamps: true,
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
