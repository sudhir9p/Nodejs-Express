import { NewsArticlesService } from '../services/service';

export class NewsArticlesRoutes {
    constructor(app) {
        this.app = app;
        this.articlesService = new NewsArticlesService();
    }

    getRoutes() {

        this.app.get('/', (req, res) => {
            res.send('Nodejs-Express HomeTask');
        });

        this.app.get('/news',
            (req, res) => {
                const result = this.articlesService.getarticles(req.params.articleId);
                res.send(result);
            });
        this.app.post('/news', (req, res) => {
            const result = this.articlesService.addarticle(req.body);
            res.send(result);
        });

        this.app.get('/news/:articleId', (req, res) => {
            const result = this.articlesService.getarticlesById(req.params.articleId);
            res.send(result);
        });
        this.app.put('/news/:articleId', (req, res) => {
            const result = this.articlesService.updatearticle(req.params.articleId, req.body);
            res.send(result);
        });
        this.app.delete('/news/:articleId', (req, res) => {
            const result = this.articlesService.deletearticles(req.params.articleId);
            res.send(result);
        });

    }
}
