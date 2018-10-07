const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const models = require('../models')

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        models.User.findById(jwt_payload.id)
            .then(user => {
                if (user) return done(null, user);
                return done(null, false)
            })
            .catch(err => console.log(err));
    }));
}