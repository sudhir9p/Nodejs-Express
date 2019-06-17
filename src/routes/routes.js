import { NewsArticlesService } from '../services/articles.service';
import { UsersService } from '../services/users.service';
import passport from 'passport';
import express from 'express';
import { JWTTokenService } from '../services/tokenHandler.service';
import { AuthService } from '../services/authorization.service';

export class NewsArticlesRoutes {
    constructor(router) {
        this.app = router;
        this.articlesService = new NewsArticlesService();
        this.userService = new UsersService();
        this.tokenService = new JWTTokenService();
        this.authService = new AuthService(this.tokenService, this.userService);
    }

    getRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Nodejs-Express HomeTask');
        });


        this.app.get('/news', async (req, res, next) => {
            try {
                await this.authService.isAuthenticated(req, res, next);
            } catch (ex) {
                next(ex);
            }
        }, async (req, res, next) => {
            try {
                const result = await this.articlesService.getarticles();
                res.send(result);
            } catch (ex) {
                next(ex);
            }
        });


        this.app.post('/news', async (req, res, next) => {
            try {
                await this.authService.isAuthenticated(req, res, next);
            } catch (ex) {
                next(ex);
            }
        }, async (req, res, next) => {
            try {
                const result = await this.articlesService.addarticle(req.body);
                res.send(result);
            } catch (ex) {
                next(ex);
            }
        });

        this.app.get('/news/:articleId', async (req, res) => {
            const result = await this.articlesService.getarticlesById(req.params.articleId);
            res.send(result);
        });

        this.app.put('/news/:articleId', async (req, res) => {
            const result = await this.articlesService.updatearticle(req.params.articleId, req.body);
            res.send(result);
        });

        this.app.delete('/news/:articleId', async (req, res, next) => {
            try {
                await this.authService.isAuthenticated(req, res, next);
            } catch (ex) {
                next(ex);
            }
        }, async (req, res, next) => {
            try {
                const result = await this.articlesService.deletearticles(req.params.articleId);
                res.send(result);
            } catch (ex) {
                next(ex);
            }
        });

        
        this.app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        }));

        this.app.get('/auth/facebook/callback',
            passport.authenticate('facebook', { scope: ['email', 'public_profile', 'user_location'] }),
            async (req, res) => {
                if (req.user && req.user.id) {
                    const existingUser = await this.userService.checkUserExists(req.user.id);

                    if (existingUser && existingUser.id) {
                        this.tokenService.verifyToken(existingUser.fbjwttoken).then((activeUser) => {
                            if (activeUser && activeUser.id) {
                                // user is active
                                res.send(req.user);
                            }
                        }, async (err) => {
                            //update token
                            const generatedtoken = this.tokenService.createToken(req.user);
                            const updatedUser = await this.userService.updateUserToken(generatedtoken, req.user);
                            res.send(updatedUser);
                        });
                    }
                    else {
                        //create token and add user in db
                        const token = this.tokenService.createToken(req.user)
                        const newUser = await this.userService.createUser(req.user, token);
                        res.send(newUser);
                    }

                }

            }
        );
    }

}
