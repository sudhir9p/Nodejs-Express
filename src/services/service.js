import { NewsArticlesModel } from '../models/aricles.model';


export class NewsArticlesService {
    constructor() {
        this.articlesModel = new NewsArticlesModel();
    }

    getarticles = async () => {
        let result = await this.articlesModel.article.find({});
        return result;
    }

    getarticlesById = async (articleId) => {
        let article = await this.articlesModel.article.find({ 'articleId': articleId });
        if (article)
            return article;
        else
            return "Cannot find article with given id";
    }

    addarticle = async (article) => {
        const validation = this.validateArticle(article);
        if (validation == "") {
            const existingArticle = await this.checkArticleExists(article.articleId);
            if (existingArticle && existingArticle.length > 0) {
                return `Article Id ${article.articleId} already exists`;
            }
            else {
                const articleModel = new this.articlesModel.article(article);
                const res = await articleModel.save();
                return res;
            }
        }
        else {
            return `Cannot add article , ${validation}`;
        }
    }

    updatearticle = async (articleId, article) => {
        if (article && article.articleId == articleId) {
            const currentArticle = await this.articlesModel.article.find({ articleId: articleId });
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

                const res = await this.articlesModel.article.findOneAndUpdate({ articleId: articleId }, { $set: newArticle }, { new: true });
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

        let res = await this.articlesModel.article.deleteOne({ articleId: articleId });
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

    async checkArticleExists(articleId) {
        const article = await this.articlesModel.article.find({ articleId: articleId });
        return article;
    }

}