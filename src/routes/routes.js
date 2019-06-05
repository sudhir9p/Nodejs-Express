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

        this.app.get('/news', async (req, res) => {
            const result = await this.articlesService.getarticles();
            res.send(result);
        });

        this.app.post('/news', async (req, res) => {
            const result = await this.articlesService.addarticle(req.body);
            res.send(result);
        });

        this.app.get('/news/:articleId', async (req, res) => {
            const result = await this.articlesService.getarticlesById(req.params.articleId);
            res.send(result);
        });

        this.app.put('/news/:articleId', async (req, res) => {
            const result = await this.articlesService.updatearticle(req.params.articleId, req.body);
            res.send(result);
        });
        this.app.delete('/news/:articleId', async (req, res) => {
            const result = await this.articlesService.deletearticles(req.params.articleId);
            res.send(result);
        });

    }
}
