import { UsersModel } from '../models/user.model';

import { clientID, clientSecret, callbackUrl } from '../../config/config.json';
import FacebookStrategy from 'passport-facebook';

export class PassportService {
    constructor(passport) {
        //     passport.use(new FacebookTokenStrategy({
        //         clientID: clientID,
        //         clientSecret: clientSecret
        //     },
        //         function (accessToken, refreshToken, profile, done) {
        //             UsersModel.createFbUser(accessToken, refreshToken, profile, function (err, user) {
        //                 return done(err, user);
        //             });
        //         }));
        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((obj, done) => {
            done(null, obj)
        });
        passport.use(new FacebookStrategy.Strategy({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            profileFields: ['id', 'displayName', 'email']
        },
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
            }));
    }

}
