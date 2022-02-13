const Pizza = require("../models/pizza.model");

const router = require("express").Router();

const test_pizza = {'name' : "test pizza"};
router.get("/", (req, res, next) => {
    // console.log(res);
   
    Pizza.find()
    .then(resultFromDB => {
        resultFromDB.push(test_pizza);
        console.log("DB Result of pizza:", resultFromDB)
        res.render("pizza/pizza-list", {pizzas: resultFromDB });
    })
    .catch()
});

module.exports = router;