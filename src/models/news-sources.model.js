import { sources } from '../data/sources-data.json'

export class NewsSourcesModel {
    constructor() {
        this.sources = sources;
    }

    getSources(sourceId) {
        if (sourceId) {
            return this.sources.filter((source) => {
                return source.id == sourceId
            });
        }
        else {
            return this.sources;
        }
    }

    addSources(body) {
        if (body && body.id && body.name && body.url) {
            this.sources.push(body);
            return "Source Added SuccessFully";
        }
        else {
            return "Cannot add source , as mandatory parameters id or name or url is missing.";
        }
    }

    updateSources(body, sourceId) {
        this.sources.forEach((source, index) => {
            if (source.id == sourceId) {
                this.sources[index] = body;
                return "Source Updated SuccessFully";
            }
        });
        return "Cannot find source with given Id";
    }

    deleteSources(sourceId) {
        let responseText = "Cannot Delete with given source Id";
        this.sources.forEach((source, index) => {
            if (source.id == sourceId) {
                this.sources.splice(index, 1);
                responseText = "Source Deleted Successfully";
                return;
            }
        });

        return responseText;
    }
}