const isLoggedIn = require("../middleware/LoggedInMiddleware");
const Ingredient = require("../models/Ingredient.model");
const Pizza = require("../models/Pizza.model")
const fileUploader = require("../config/cloudinary.config")
const router = require("express").Router();

router.get("/", (req, res, next) => {

  Pizza.find()
    .then((resultFromDB) => {
    
      res.render("pizza/pizza-list", { pizzas: resultFromDB });
    })
    .catch();
});

router.get("/create", isLoggedIn, (req, res, next) => {

  const CheeseEnumArray = Pizza.schema.path("baseCheese").caster.enumValues;
  Ingredient.find()
    .then((ingredients) => {
      res.render("pizza/pizza-create", {
        ingredientsArr: ingredients , 
        enumCheeseArr: CheeseEnumArray,
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
    baseCheese: req.body.baseCheese,
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
  Ingredient.find()
    .then((ingredientsResult) => {
      // console.log("new type", authorsResult)
      res.render("pizza/pizza-ingredients", { ingredients: ingredientsResult });
    })
    .catch();
});

router.post("/create/ingredients", (req, res, next) => {
  const ingredientDetails = {
    name: req.body.name,
  }
  Ingredient.create(ingredientDetails)
    .then((ingredientDetails) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("Error creating new ingredientDetails...", err);
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



router.get("/:pizzaId/edit", (req, res, next) => {
  const CheeseEnumArray = Pizza.schema.path("baseCheese").caster.enumValues;
  let ingredientsInfo;
  const findPizza = Pizza.findById(req.params.pizzaId)
  .populate("toppings")
  
  Ingredient.find()
  .then((ingredients)=>{
    ingredientsInfo = ingredients
    return findPizza
  })
  .then((pizzaFromDB)=> {
    res.render("pizza/pizza-edit", {
      pizzaArr: pizzaFromDB,
      enumCheeseArr: CheeseEnumArray,
      ingredientsArr: ingredientsInfo
    })
  })
  .catch( err => {
    console.log("Error getting pizza details from DB...", err);
  });
})

router.post("/:pizzaId/edit", fileUploader.single('pizza-cover-image'),isLoggedIn, (req, res, next) => {
  const pizzaId = req.params.pizzaId;
  let image;
  
  console.log("here we have edit", pizzaId); 
  if (!req.file || !req.file.path) {
    image = "https://res.cloudinary.com/dizetpb6b/image/upload/v1645089700/pizza-stored-images/l0sc8lomwmawxn0ctyir.jpg"
  }
  else {
    image = req.file.path
  }
  const newDetailsEdit = {
    name: req.body.name,
    tags: req.body.tags,
    dough: req.body.dough,
    sauces: req.body.sauces,
    toppings: req.body.toppings,
    baseCheese: req.body.baseCheese,
    imagesUrl: image,
    details: req.body.details,
  }
  console.log("here we have our new pizza", newDetailsEdit); 
  Pizza.findByIdAndUpdate(pizzaId, newDetailsEdit)
  .then( () => {
    res.redirect(`/papaPizza/${pizzaId}`);
  })
  .catch( err => {
    console.log("Error updating pizza...", err);
  });
});
router.post("/:pizzaId/delete", (req, res, next) => {
  Pizza.findByIdAndDelete(req.params.pizzaId)
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      console.log("Error deleting pizza...", err);
    });

});


module.exports = router;