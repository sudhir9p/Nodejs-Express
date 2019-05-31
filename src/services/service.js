import { NewsArticlesModel } from '../models/model';


export class NewsArticlesService {
    constructor() {
        this.articlesModel = new NewsArticlesModel();
    }

    getarticles = (articleId) => {
        return new Promise((resolve, reject) => {
            resolve(this.articlesModel.get(articleId));
        });
    }

    getarticlesById = (articleId) => {
        return new Promise((resolve, reject) => {
            const article = this.articlesModel.articles.find((article) => {
                if (article.id == articleId)
                    return article;
            });
            if (article)
                resolve(article);
            else
                reject("Cannot find article with given id");
        });
    }

    addarticles = (article) => {
        return new Promise((resolve, reject) => {
            if (article && article.id && article.name && article.url) {
                this.articlesModel.add(article);
                resolve("Article Added SuccessFully");
            }
            else {
                reject("Cannot add article , as mandatory parameters id or name or url is missing.");
            }
        });
    }

    updatearticles = (articleId, article) => {
        return new Promise((resolve, reject) => {
            if (article && article.id == articleId) {
                const articleIndex = this.findArticleIndex();
                if (articleIndex) {
                    this.articlesModel.update(articleIndex, article);
                    resolve("Article Updated SuccessFully")
                }
                else {
                    reject("Cannot find article with given id.");
                }
            }
            else {
                reject("The Id passed and article id in body should match.");
            }
        });
    }

    deletearticles = (articleId) => {
        return new Promise((resolve, reject) => {
            const articleIndex = this.findArticleIndex();
            if (articleIndex) {
                this.articlesModel.delete(articleId);
                resolve("Article deleted successfully");
            }
            else {
                reject("Cannot find article with given id.")
            }
        });

    }

    findArticleIndex() {
        const articleIndex = this.articlesModel.articles.findIndex((article, index) => {
            if (article.id == article.id)
                return index;
        });
        return articleIndex;
    }


}