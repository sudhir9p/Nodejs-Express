import { articles } from '../data/data.json'

export class NewsArticlesModel {
    constructor() {
        this.articles = articles;
    }

    getarticles() {
        return this.articles;
    }

    addarticles(article) {
        this.articles.push(article);
    }

    updatearticles(articleIndex, article) {
        this.articles[articleIndex] = article;
    }

    deletearticles(articleIndex) {
        this.articles.splice(articleIndex, 1);
    }
}