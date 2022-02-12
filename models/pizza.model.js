const { Schema, model } = require("mongoose");


const pizzaSchema = new Schema(
  {
    Pizzalist: {
      name: String,
      type: String,
      toppings: [String],
      saus: [String],
      dough: String,

      details: String,
    },
    },
  {
    
    timestamps: true,
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
