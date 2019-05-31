import { articles } from '../data/data.json'

export class NewsArticlesModel {
    constructor() {
        this.articles = articles;
    }

    get() {
        return this.articles;
    }

    add(article) {
        this.articles.push(article);
    }

    update(articleIndex, article) {
        this.articles[articleIndex] = article;
    }

    delete(articleIndex) {
        this.articles.splice(articleIndex, 1);
    }
}