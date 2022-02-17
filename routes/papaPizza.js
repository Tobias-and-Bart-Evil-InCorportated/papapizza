const isLoggedIn = require("../middleware/LoggedInMiddleware");
const Ingredients = require("../models/Ingredients.model");
const Pizza = require("../models/Pizza.model")
// const fileUploader = require('../config/cloudinary.config');
const fileUploader = require("../config/cloudinary.config")
const router = require("express").Router();

// const test_pizza = {'name' : "test pizza"};
router.get("/", (req, res, next) => {
  // console.log(res);
  Pizza.find()
    .then((resultFromDB) => {
      // console.log("DB Result of pizza:", resultFromDB)
      res.render("pizza/pizza-list", { pizzas: resultFromDB });
    })
    .catch();
});

router.get("/create", isLoggedIn, (req, res, next) => {
  // const toppingEnumArray = Pizza.schema.path("toppings").caster.enumValues;
  // const CheeseEnumArray = Pizza.schema.path("baseCheese").caster.enumValues;
  Ingredients.find()
    .then((ingredients) => {
      res.render("pizza/pizza-create", {
        ingredientsArr: ingredients,
        // enumCheeseArr: CheeseEnumArray,
      })
    })
    .catch();
});

router.post("/create", fileUploader.single('pizza-cover-image'), (req, res, next) => {
  let image;
  if (!req.file || !req.file.path) {
    image = "https://res.cloudinary.com/dizetpb6b/image/upload/v1645089700/pizza-stored-images/l0sc8lomwmawxn0ctyir.jpg"
  }
  else {
    image = req.file.path
  }
  const pizzaDetails = {
    name: req.body.name,
    tags: req.body.tags,
    dough: req.body.dough,
    sauces: req.body.sauces,
    toppings: req.body.toppings,
    // baseCheese: req.body.baseCheese,
    imagesUrl: image,
    details: req.body.details,
  };
  Pizza.create(pizzaDetails)
    .then((pizza) => {
      res.redirect("/papaPizza");
    })
    .catch((err) => {
      console.log("Error creating new pizza...", err);
    });
});

router.get("/create/ingredients", isLoggedIn, (req, res, next) => {
  Ingredients.find()
    .then((ingredientsResult) => {
      // console.log("new type", authorsResult)
      res.render("pizza/pizza-ingredients", { ingredients: ingredientsResult });
    })
    .catch();
});

router.post("/create/ingredients", (req, res, next) => {
  const ingredientsDetails = {
    name: req.body.name,
    calories: req.body.calories,
  }
  Ingredients.create(ingredientsDetails)
    .then((ingredientsDetails) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error creating new ingredientsDetails...", err);
    });
});

router.get("/:pizzaId", (req, res, next) => {
  Pizza.findById(req.params.pizzaId)
    .populate("toppings")

    .then((resultFromDB) => {
      console.log(resultFromDB)
      res.render("pizza/pizza-details", resultFromDB);
    })
    .catch();
});

module.exports = router;