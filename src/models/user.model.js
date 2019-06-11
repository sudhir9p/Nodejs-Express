import { Schema, model } from 'mongoose';

export class UsersModel {

    constructor() {
        const userSchema = this.createUserSchema();
        this.user = new model('User', userSchema, 'Users')
    }

    createUserSchema() {
        const usersSchema = new Schema({
            id: String,
            email: {
                type: String, required: true,
                trim: true, unique: true,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            fbjwttoken: {
                type: String,
                select: false
            },
            username: { type: String }
        });

        return usersSchema;
    }

    get() {

    }

    async getById(userId) {
        return await this.user.find({ 'id': userId }, { fbjwttoken: 1 });
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
        return await this.user.find({ 'email': email }, { fbjwttoken: 1 });
    }

}