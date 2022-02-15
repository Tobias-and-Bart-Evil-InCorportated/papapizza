const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        req.app.locals.whenLoggedIn = false; 
        return res.render("auth/createUser");
    }
    next();
};
module.exports = isLoggedIn;