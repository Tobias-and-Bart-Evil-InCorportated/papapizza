const router = require("express").Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const isLoggedIn =  require("../middleware/LoggedInMiddleware");
const isLoggedOut = require("../middleware/LoggedOutMiddleware");
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/createUser", isLoggedOut, (req, res, next) => {
    res.render("auth/createUser");
});


router.post("/createUser", isLoggedOut, (req, res, next) => {

    const {password, email, name} = req.body;

    if( !password || !email || !name){
        res.render('auth/createUser', { errorMessage: 'All fields are mandatory. Please provide name, email and password.' });
        return;
    }
    else if (password.length < 4) {
        return res.status(400).render("auth/login", {
        errorMessage: "Your password needs to be at least 4 characters long.",
        });
    }

    bcryptjs
        .genSalt(saltRounds)
        .then( salt => {
            return bcryptjs.hash(password, salt)
        })
        .then( (hash) => {
            const userDetails = {
                
                email,
                passwordHash: hash,
                userName: name,
            }
            return User.create(userDetails);
        })
        .then( userFromDB => {
            res.render("auth/login");
        })
        .catch( error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/createUser', { errorMessage: error.message });
            } else {
                next(error);
            }
        });
});


router.get('/login', isLoggedOut, (req, res) => res.render('auth/login'));


router.post("/login", isLoggedOut, (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.render('auth/login', { errorMessage: 'Please enter both, email and password to login.' });
        return;
    }
    

    User.findOne({email: email})
        .then( userFromDB => {
            if(!userFromDB){
                res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
                return;
            } else if (bcryptjs.compareSync(password, userFromDB.passwordHash)) {
                //login sucessful
                req.session.currentUser = userFromDB;
                res.render("auth/user-profile");
            } else {
                //login failed
                res.render('auth/login', { errorMessage: 'Incorrect credentials.' });
            }
        })
        .catch(error => console.log("Error getting user details from DB", error));
});


router.get('/user-profile', isLoggedIn, (req, res) => {
    User.findOne()
    res.render('auth/user-profile', { userInSession: req.session.currentUser });
    
});


router.post('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/');
    });
});


module.exports = router;


