const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbUser = require('./controllers/user_controllers');

const loadPassport = (passport) => {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await dbUser.getUserByUsername(username);
            if (!user) return (done, null);
            const matchedPassword = await bcrypt.compare(password, user.password);
            if (!matchedPassword) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await dbUser.getUserbyId(id);
        return done(null, user);
    });
};
  


const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(400).json({message:'Login required.'});
    res.redirect('/login');
}; 

module.exports = {
    loadPassport,
    checkAuthenticated
};