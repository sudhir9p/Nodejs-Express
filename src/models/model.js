import { articles } from '../data/data.json'

export class NewsArticlesModel {
    constructor() {
        this.articles = articles;
    }

    get() {
        return this.articles;
    }

    getById(articleId) {
        const article = this.articles.find((article) => {
            if (article.id == articleId)
                return article;
        });
        return article;
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

    getArticleIndex(articleId) {
        const articleIndex = this.articles.findIndex((article, index) => {
            if (article.id == articleId) {
                return index;
            }
        });
        return articleIndex;
    }
}