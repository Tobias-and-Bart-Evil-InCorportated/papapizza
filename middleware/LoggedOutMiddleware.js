const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        req.app.locals.whenLoggedIn = true; 
        return res.redirect('/');
    }
    next();
};
module.exports =  isLoggedOut;