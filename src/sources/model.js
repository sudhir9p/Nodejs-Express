import { sources } from '../../data/sources-data.json'

export class SourcesModel {
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
        this.sources.push(body);
    }

    updateSources(body, sourceId) {
        this.sources.forEach((source, index) => {
            if (source.id == sourceId) {
                this.sources[index] = body;
            }
        });
    }

    deleteSources(sourceId) {
        this.sources.forEach((source, index) => {
            if (source.id == sourceId) {
                this.sources.splice(index, 1);
            }
        });
    }
}