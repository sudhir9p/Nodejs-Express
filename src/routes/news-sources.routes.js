import { NewsSourcesService } from '../services/news-sources.service';

export class NewsSourcesRoutes {
    constructor(app) {
        this.app = app;
        this.sourcesService = new NewsSourcesService();
    }

    getRoutes() {
        this.app.route('/news')
            .get((req, res, next) => {
                //middle ware
                console.log(`Request from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesService.getSourcesData)
            .post((req, res, next) => {
                //middle ware
                console.log(`Request from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesService.addSources);

        this.app.route('/news/:sourceId')
            .get((req, res, next) => {
                //middle ware
                console.log(`Request to detaills by ID from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesService.getSourcesData)
            .put((req, res, next) => {
                //middle ware
                console.log(`Request to detaills by ID from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesService.updateSources)
            .delete((req, res, next) => {
                //middle ware
                console.log(`Request to detaills by ID from: ${req.originalUrl}`)
                console.log(`Request type: ${req.method}`)
                next();
            }, this.sourcesService.deleteSources);

    }
}
