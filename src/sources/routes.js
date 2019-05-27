import { SourcesController } from './controller.js';

export class SourcesRoutes {
    constructor(app) {
        this.app = app;
        this.sourcesController = new SourcesController();
    }

    getRoutes() {
        this.app.route('/news')
            .get((req, res, next) => {
                //middle ware
                console.log(`Request from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesController.getSourcesData)
            .post((req, res) => {
                //middle ware
                console.log(`Request from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesController.addSources);

        this.app.route('/news/:sourceId')
            .get((req, res, next) => {
                //middle ware
                console.log(`Request from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesController.getSourcesData)
            .put((req, res) => {

            })
            .delete((req, res) => {

            });

    }
}
