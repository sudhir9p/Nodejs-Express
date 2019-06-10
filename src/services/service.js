import { NewsArticlesModel } from '../models/model';


export class NewsArticlesService {
    constructor() {
        this.articlesModel = new NewsArticlesModel();
    }

    getarticles = async () => {
        let result = await this.articlesModel.get();
        return result;
    }

    getarticlesById = async (articleId) => {
        let article = await this.articlesModel.getById(articleId);
        if (article)
            return article;
        else
            return "Cannot find article with given id";
    }

    addarticle = async (article) => {
        const validation = this.validateArticle(article);
        if (validation == "") {
            const existingArticle = await this.articlesModel.getById(article.articleId);
            if (existingArticle && existingArticle.length > 0) {
                return `Article Id ${article.articleId} already exists`;
            }
            else {
                return await this.articlesModel.add(article);
            }
        }
        else {
            return `Cannot add article , ${validation}`;
        }
    }

    updatearticle = async (articleId, article) => {
        if (article && article.articleId == articleId) {
            const currentArticle = await this.articlesModel.getById(articleId);
            const newArticle = {};
            if (currentArticle) {
                if (article.title)
                    newArticle.title = article.title;
                if (article.author)
                    newArticle.author = article.author;
                if (article.url)
                    newArticle.url = article.url;
                if (article.content)
                    newArticle.content = article.content;
                if (article.urlToImage)
                    newArticle.urlToImage = article.urlToImage;
                if (article.description)
                    newArticle.description = article.description;

                const res = await this.articlesModel.update(articleId, article);
                return res;
            }
            else {
                return "Cannot find article with given id.";
            }

        }
        else {
            return "The Id passed and article id in body should match.";
        }
    }

    deletearticles = async (articleId) => {

        let res = await this.articlesModel.delete(articleId);
        if (res.deletedCount > 0)
            return "Article deleted successfully";
        else
            return "Cannot delete article";

    }

    validateArticle(article) {
        let message = "";
        if (!article.articleId)
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