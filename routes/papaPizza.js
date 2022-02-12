const Pizza = require("../models/pizza.model");

const router = require("express").Router();


router.get("/", (req, res, next) => {
    res.send("site Cheak === PIZZA LIST");
});

module.exports = router;