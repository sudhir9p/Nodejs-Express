import passport from 'passport';
import { JWTTokenService } from '../services/tokenHandler.service';
import { AuthService } from '../services/authorization.service';
import express from 'express';

export class AuthRoutes {
    constructor(userService) {
        this.authRouter = express.Router();
        this.userService = userService;
        this.tokenService = new JWTTokenService();
        this.authService = new AuthService(this.tokenService, this.userService);
        this.getRoutes();
    }

    getRoutes() {
        this.authRouter.get('/facebook', passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        }));

        this.authRouter.get('/facebook/callback',
            passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] }),
            async (req, res, next) => {
                try {
                    await this.authService.authorizeFacebookUser(req, res);
                }
                catch (e) {
                    next(e);
                }
            }
        );
    }

}
