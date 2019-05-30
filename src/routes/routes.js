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

        this.app.route('/news')
            .get((req, res, next) => {
                this.articlesService.get(req.params.articleId).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            })
            .post((req, res, next) => {
                this.articlesService.add(req.params.body).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            });

        this.app.route('/news/:articleId')
            .get((req, res, next) => {
                this.articlesService.getById(req.params.articleId).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            })
            .put((req, res, next) => {
                this.articlesService.update(req.params.articleId, req.params.body).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            })
            .delete((req, res, next) => {

                this.articlesService.delete(req.params.articleId).then((result) => {
                    res.send(result);
                }).catch((err) => {
                    res.send(err);
                });
            });

    }
}
