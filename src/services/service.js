import { NewsArticlesModel } from '../models/model';


export class NewsArticlesService {
    constructor() {
        this.articlesModel = new NewsArticlesModel();
    }

    getarticles = (articleId) => {
        return this.articlesModel.get(articleId);
    }

    getarticlesById = (articleId) => {
        const article = this.articlesModel.getById(articleId);
        if (article)
            return article;
        else
            return "Cannot find article with given id";
    }

    addarticle = (article) => {
        const validation = this.validateArticle();
        if (validation == "") {
            this.articlesModel.add(article);
            return ("Article Added SuccessFully");
        }
        else {
            return `Cannot add article , ${validation}`;
        }
    }

    updatearticle = (articleId, article) => {
        if (article && article.id == articleId) {
            const validation = this.validateArticle();
            if (validation == "") {
                const articleIndex = this.articlesModel.getArticleIndex(articleId);
                if (articleIndex) {
                    this.articlesModel.update(articleIndex, article);
                    return "Article Updated SuccessFully";
                }
                else {
                    return "Cannot find article with given id.";
                }
            }
            else
                return validation;
        }
        else {
            return "The Id passed and article id in body should match.";
        }
    }

    deletearticles = (articleId) => {
        const articleIndex = this.articlesModel.getArticleIndex(articleId);
        if (articleIndex) {
            this.articlesModel.delete(articleId);
            return "Article deleted successfully";
        }
        else {
            return "Cannot find article with given id.";
        }
    }

    validateArticle(article) {
        let message = "";
        if (!article.id)
            message = "Article Id is required";
        if (!article.author)
            message = "Article author is required";
        if (!article.title)
            message = "Article title is required";
        if (!article.url)
            message = "Article url is required";
        if (!article.content)
            message = "Article content is required";
        else
            return message;
    }

}