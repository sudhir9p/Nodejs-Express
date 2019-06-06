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
        const validationMessage = this.validateArticle(article);
        if (validationMessage) {
            throw validationMessage;
        }
        else {
            const articleId = this.articlesModel.getArticleIndex(article.id);
            if (articleId === -1) {
                this.articlesModel.add(article);
                return "Article Added SuccessFully";
            }
            else {
                return `Article Id ${article.id} already exists`;
            }
        }
    }

    updatearticle = (articleId, article) => {
        if (article && article.id == articleId) {
            const currentArticle = this.articlesModel.getById(articleId);
            const articleIndex = this.articlesModel.getArticleIndex(articleId);
            if (currentArticle) {
                if (article.title)
                    currentArticle.title = article.title;
                if (article.author)
                    currentArticle.author = article.author;
                if (article.url)
                    currentArticle.url = article.url;
                if (article.content)
                    currentArticle.content = article.content;
                if (article.urlToImage)
                    currentArticle.urlToImage = article.urlToImage;
                if (article.description)
                    currentArticle.description = article.description;

                this.articlesModel.update(articleIndex, currentArticle);
                return "Article Updated SuccessFully";
            }
            else {
                return "Cannot find article with given id.";
            }

        }
        else {
            return "The Id passed and article id in body should match.";
        }
    }

    deletearticles = (articleId) => {
        const articleIndex = this.articlesModel.getArticleIndex(articleId);
        if (articleIndex) {
            this.articlesModel.delete(articleIndex);
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