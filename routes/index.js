const Pizza = require("../models/pizza.model");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) =>{

  // const pizzaDetails = {
  //   name: "test margharita 6",
  //   tags: ["veggie"],
  //   toppings: ["salami"],
  //   sauces: ["tomato sauce"],
  //   baseCheese:"cheese",
  //   dough:"neapolitian",
  //   details:"no eggs needed"
  // }

  // Pizza.create(pizzaDetails)
  //   .then( (pizzaDetails)=> console.log("create pizza",+ pizzaDetails))
    
  //   .catch()


  res.render("index");
 });

module.exports = router;


