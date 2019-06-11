import { NewsArticlesModel } from '../models/articles.model';


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
            throw new Error("Cannot find article with given id");
    }

    addarticle = async (article) => {
        this.validateArticle(article);
        const existingArticle = await this.articlesModel.getById(article.articleId);
        if (existingArticle && existingArticle.length > 0) {
            throw new Error(`Article Id ${article.articleId} already exists`);
        }
        else {
            return await this.articlesModel.add(article);
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
                throw new Error("Cannot find article with given id.");
            }

        }
        else {
            throw new Error("The Id passed and article id in body should match.");
        }
    }

    deletearticles = async (articleId) => {

        let res = await this.articlesModel.delete(articleId);
        if (res.deletedCount > 0)
            return "Article deleted successfully";
        else
            throw new Error("Cannot delete article");

    }

    validateArticle(article) {
        const cannotAdd = "Cannot add article ";
        if (!article.articleId)
            throw new Error(`${cannotAdd} Article Id is required`);
        if (!article.author)
            throw new Error(`${cannotAdd} Article author is required`);
        if (!article.title)
            throw new Error(`${cannotAdd} Article title is required`);
        if (!article.url)
            throw new Error(`${cannotAdd} Article url is required`);
        if (!article.content)
            throw new Error(`${cannotAdd} Article content is required`);
    }
}