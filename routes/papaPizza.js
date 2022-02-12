const Pizza = require("../models/pizza.model");

const router = require("express").Router();


router.get("/", (req, res, next) => {
    res.send("pizza")
    // Pizza.find()
    // .then(resultFromDB => {
    //     console.log(resultFromDB)
    //     res.render("pizza-list", {pizza: resultFromDB });
    // })
    // .catch()
});

module.exports = router;