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
                this.articlesService.get(req.params.articleId).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            });
        this.app.post('/news', (req, res) => {
            this.articlesService.add(req.body).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });

        this.app.get('/news/:articleId', (req, res) => {
            this.articlesService.getById(req.params.articleId).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
        this.app.put('/news/:articleId', (req, res) => {
            this.articlesService.update(req.params.articleId, req.body).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });
        this.app.delete('/news/:articleId', (req, res) => {

            this.articlesService.delete(req.params.articleId).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            });
        });

    }
}
