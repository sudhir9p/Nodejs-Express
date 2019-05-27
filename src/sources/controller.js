import { SourcesModel } from './model.js';


export class SourcesController {
    constructor() {
        this.sourcesModel = new SourcesModel();
    }

    getSourcesData = (req, res) => {
        res.send(this.sourcesModel.getSources(req.params.sourceId));
    }

    addSources = (req, res) => {
        this.sourcesModel.addSources(req.body);
        res.send("Source Added SuccessFully");
    }

    updateSources = (req, res) => {
        this.sourcesModel.updateSources(req.body, req.params.sourceId);
        res.send("Source Updated SuccessFully");
    }

    deleteSources = (req, res) => {
        this.sourcesModel.deleteSources(req.params.sourceId);
        res.send("Source Deleted Successfully");
    }


}