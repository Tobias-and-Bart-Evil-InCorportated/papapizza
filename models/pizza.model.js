const { Schema, model } = require("mongoose");


const pizzaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name of a pizza is required.'],
      unique: true,
    },
    tags: [String],
    toppings: [{ type: Schema.Types.ObjectId, ref: "Ingredients" }],
    sauces: {
      type: [String],
      enum: ["tomato sauce", "crême fresh", "barbecue sauce"]
    },
    baseCheese: {
      type: [String],
      enum: ["shredded cheese", "gouda", "cheddar", "gorgonzola", "mozarella", "bufflo mozarella", "pecorino"],
    },
    dough: {
      type: String,
      required: true,
      enum: ["neapolitian", "gluten free", "vegie dough"],
      default: "neapolitian",

    },
    imagesUrl: String,
    details: String,

  },
  {

    timestamps: true,
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
