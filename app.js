// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const isLoggedIn =  require("./middleware/LoggedInMiddleware");
const isLoggedOut = require("./middleware/LoggedOutMiddleware");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const projectName = "papapizza";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;
app.use((req,res,next) => {
    req.app.locals.whenLoggedIn = !!req.session.currentUser;
    next()
})

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// const accountRoutes = require("./routes/User");
// app.use("/user", accountRoutes);

const pizzaRoutes = require("./routes/papaPizza");
app.use("/papaPizza", pizzaRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
