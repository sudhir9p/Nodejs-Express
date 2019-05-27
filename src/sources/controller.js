import { SourcesModel } from './model.js';


export class SourcesController {
    constructor() {
        this.sourcesModel = new SourcesModel();
    }

    getSourcesData = (req, res) => {
        res.send(this.sourcesModel.getSources(req.params.id));
    }

    addSources = (req, res) => {
        res.send("Updated SuccessFully");
    }


}