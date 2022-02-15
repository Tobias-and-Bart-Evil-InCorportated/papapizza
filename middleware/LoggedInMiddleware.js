const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.render("auth/createUser");
    }
    next();
};
module.exports = isLoggedIn;