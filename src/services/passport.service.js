import { clientID, clientSecret, callbackUrl } from '../../config/config.json';
import FacebookStrategy from 'passport-facebook';

export class PassportService {
    constructor(passport) {
        this.passport = passport;
        this.initialize();
    }

    initialize() {
        this.serializeUser();
        this.deserializeUser();
        this.passport.use(new FacebookStrategy.Strategy({
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            profileFields: ['id', 'displayName', 'email']
        },
            (accessToken, refreshToken, profile, done) => {
                return done(null, profile);
            }));
    }

    serializeUser() {
        this.passport.serializeUser((user, done) => {
            done(null, user);
        });
    }

    deserializeUser() {
        this.passport.deserializeUser((obj, done) => {
            done(null, obj)
        });
    }

}
