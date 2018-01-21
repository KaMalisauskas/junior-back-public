import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import config from './../../config/prod.json';

import RegistrationModel from './Registration-model';

const localLogin = new LocalStrategy(async (username, password, done)  => {
    try {
        const user = await RegistrationModel.findOne({ username });
        // checking if the user exists
        if (!user) {
           return done(null, false);
        } else if (!user.authenticateUser(password)) {
            return done(null, false);
        }

        return done(null, user);

    } catch (error) {

        return done(error, false);
    }

    });

const jwtOpt = {
    //it will require jwt
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.development.JWT_SECRET
};
//payload is from model method create token
const authLogin = new JWTStrategy(jwtOpt, async (payload, done) => {
    try {
        const user = await RegistrationModel.findById(payload._id );

        if(!user) {
            return done(null, false);
        }

        return done(null, user);


    } catch(error) {
        return done(error, false, {message: "password doesnt match"});
    }
});

passport.use(localLogin);
passport.use(authLogin);

export const authLocal = passport.authenticate('local', { session: false});
export const authJwt = passport.authenticate('jwt', { session: false });