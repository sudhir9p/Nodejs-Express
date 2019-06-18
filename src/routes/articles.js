import { NewsArticlesService } from '../services/articles.service';
import { JWTTokenService } from '../services/tokenHandler.service';
import { AuthService } from '../services/authorization.service';
import express from 'express';

export class NewsArticlesRoutes {
    constructor(userService) {
        this.articlesRouter = express.Router();
        this.userService = userService;
        this.articlesService = new NewsArticlesService();
        this.tokenService = new JWTTokenService();
        this.authService = new AuthService(this.tokenService, this.userService);
        this.getRoutes();
    }

    getRoutes() {

        this.articlesRouter.get('/', async (req, res, next) => {
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


        this.articlesRouter.post('/', async (req, res, next) => {
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

        this.articlesRouter.get('/:articleId', async (req, res) => {
            const result = await this.articlesService.getarticlesById(req.params.articleId);
            res.send(result);
        });

        this.articlesRouter.put('/:articleId', async (req, res) => {
            const result = await this.articlesService.updatearticle(req.params.articleId, req.body);
            res.send(result);
        });

        this.articlesRouter.delete('/:articleId', async (req, res, next) => {
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
    }

    async isAuthenticated(){
        try {
            await this.authService.isAuthenticated(req, res, next);
        } catch (ex) {
            next(ex);
        }
    }

}
