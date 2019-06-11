
import { Schema, model } from 'mongoose';

export class NewsArticlesModel {

    constructor() {
        const articleSchema = this.createArticleSchema();
        this.article = new model('Article', articleSchema, 'Articles')
    }


    async get() {
        return await this.article.find({});
    }

    async getById(articleId) {
        return await this.article.find({ 'articleId': articleId });
    }

    async add(article) {
        const articleModel = new this.article(article);
        const res = await articleModel.save();
        return res;
    }

    async update(articleId, newArticle) {
        return await this.article.findOneAndUpdate({ articleId: articleId }, { $set: newArticle }, { new: true });
    }

    async delete(articleId) {
        return await this.article.deleteOne({ articleId: articleId });
    }


    createArticleSchema() {
        const articleSchema = new Schema({
            articleId: {
                type: String,
                required: true
            },
            author: {
                type: String,
                required: true,
                default: "SUDHIR"
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
            urlToImage: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        });

        return articleSchema;
    }
}