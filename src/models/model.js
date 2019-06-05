import { articles } from '../data/data.json'

import { Schema, model } from 'mongoose';

export class NewsArticlesModel {

    constructor() {
        const articleSchema = this.createArticleSchema();
        this.article = new model('Article', articleSchema, 'Articles')
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