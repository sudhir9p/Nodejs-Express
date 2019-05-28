import { NewsSourcesModel } from '../models/news-sources.model';


export class NewsSourcesService {
    constructor() {
        this.sourcesModel = new NewsSourcesModel();
    }

    getSourcesData = (req, res) => {
        res.send(this.sourcesModel.getSources(req.params.sourceId));
    }

    addSources = (req, res) => {
        const response = this.sourcesModel.addSources(req.body);
        res.send(response);
    }

    updateSources = (req, res) => {
        const response = this.sourcesModel.updateSources(req.body, req.params.sourceId);
        res.send(response);
    }

    deleteSources = (req, res) => {
        const response = this.sourcesModel.deleteSources(req.params.sourceId);
        res.send(response);
    }


}