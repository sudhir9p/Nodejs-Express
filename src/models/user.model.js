import { Schema, model } from 'mongoose';

export class UsersModel {

    constructor() {
        const userSchema = this.createUserSchema();
        this.user = new model('User', userSchema, 'Users')
    }

    createUserSchema() {
        const usersSchema = new Schema({
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

    add(token, displayname, email) {
        const user = { email: email, fbjwttoken: token, username: displayname }
    }

    get() {

    }

    getByEmailId() {

    }

}