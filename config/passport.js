const passport = require('passport');
const LocalStrategy = require('passport-local');
const dbUser = require('./controllers/user_controllers');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser((id, done) => {
    dbUser.getUserbyId(id, (err, user) => {
        done(err, user);
    })
});
  
  
passport.use(new LocalStrategy((username, password, done) => {
    dbUser.getUserByUsername({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (user.password != password) return done(null, false);
        return done(null, user);
    });
}));

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}; // Is this needed?