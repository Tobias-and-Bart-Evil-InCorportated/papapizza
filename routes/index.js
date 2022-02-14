const Pizza = require("../models/pizza.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) =>{

  // const pizzaDetails = {
  //   name: "test margharita 5",
  //   tags: ["veggie"],
  //   toppings: ["pinnaple"],
  //   sauces: ["tomato base"],
  //   baseCheese:"cheese",
  //   dough:"neapolitian",
  // }

  // Pizza.create(pizzaDetails)
  //   .then( (pizzaDetails)=> console.log("create pizza",+ pizzaDetails))
    
  //   .catch()


  res.render("index");
 });

module.exports = router;


