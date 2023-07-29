const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('../db/db');
const queries = require('../db/user_queries');

const loadPassport = (passport) => {
    const authenticateUser = (username, password, done) => {
        pool.query(queries.getUserByUsername), [username], async (error, results) => {
            if (error) return done(error);
            if (results.rows.length > 0) {
                const user = results.rows[0];
                const matchedPassword = await bcrypt.compare(password, user.password)
                if (!matchedPassword) return done(null, false);
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
      };

    passport.use(new LocalStrategy(authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        pool.query(queries.getUserById, [id], (error, results) => {
            if (error) throw error;
            const user = results.rows[0];
            return done(null, user);
        })
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