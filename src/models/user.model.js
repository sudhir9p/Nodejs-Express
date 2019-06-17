import { Schema, model } from 'mongoose';

export class UsersModel {

    constructor() {
        const userSchema = this.createUserSchema();
        this.user = new model('User', userSchema, 'Users')
    }

    createUserSchema() {
        const usersSchema = new Schema({
            id: String,
            email: String,
            fbjwttoken: String,
            username: String
        });

        return usersSchema;
    }

    async get() {
        return await this.user.find({});
    }

    async getById(userId) {
        return await this.user.find({ 'id': userId }).select({ "username": 1, "_id": 0, "email": 1, "fbjwttoken": 1, "id": 1 });
    }

    async add(user) {
        const userModel = new this.user(user);
        const res = await userModel.save();
        return res;
    }

    async update(currentUser) {
        return await this.user.findOneAndUpdate({ id: currentUser.id }, { $set: currentUser }, { new: true });
    }

    async getByUserEmail(email) {
        return await this.user.find({ 'email': email }).select({ "username": 1, "_id": 0, "email": 1, "fbjwttoken": 1 });
    }

}