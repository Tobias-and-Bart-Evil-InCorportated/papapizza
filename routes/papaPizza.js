const Pizza = require("../models/pizza.model");

const router = require("express").Router();

// const test_pizza = {'name' : "test pizza"};
router.get("/", (req, res, next) => {
    // console.log(res);
   
    Pizza.find()
    .then(resultFromDB => {
        // resultFromDB.push(test_pizza);
        console.log("DB Result of pizza:", resultFromDB)
        res.render("pizza/pizza-list", {pizzas: resultFromDB });
    })
    .catch()
});

router.get("/create", (req, res, next) => {
    Pizza.find()
    .then( (pizzasResult) => {
      // console.log("new type", authorsResult)
      res.render("pizza/pizza-create", {pizza: pizzasResult});
    })
    .catch();
  });

router.post("/create", (req, res, next) => {
    console.log(req.body);

    const pizzaDetails = {
      name: req.body.name,
      type: req.body.type,
      saus: req.body.saus,
      toppings: req.body.toppings,
      dough: req.body.dough,
      details: req.body.details,
      
    }
    Pizza.create(pizzaDetails)
    .then(pizza => {
      res.redirect("/pizza")
    })
    .catch((err) => {
      console.log("Error creating new pizza...", err);
    })
  });

module.exports = router;