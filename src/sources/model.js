import { sources } from '../../data/sources-data.json'

export class SourcesModel {
    constructor() {
        this.sources = sources;
    }

    getSources() {
        if (id) {
            return this.sources.filter((source) => {
                return source.id == id
            });
        }
        else {
            return this.sources;
        }
    }
}