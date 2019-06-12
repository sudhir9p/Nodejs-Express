import { UsersModel } from '../models/user.model'

export class UsersService {
    constructor() {
        this.userModel = new UsersModel();
    }


    async checkUserExists(userId) {
        const currentUser = await this.userModel.getById(userId);
        if (currentUser && currentUser[0]) {
            return currentUser[0].toObject();
        }
        else
            return null;
    }

    async updateUserToken(token, user) {
        user.fbjwttoken = token;
        const result = await this.userModel.update(user);
        return result;
    }

    async createUser(user, token) {
        const currentUser = { "id": user.id, "email": user.emails[0].value, "fbjwttoken": token, "username": user.displayName, };
        const result = await this.userModel.add(currentUser);
        return result;
    }

    async getUserByEmail(emailId) {
        const currentUser = await this.userModel.getByUserEmail(emailId);
        return currentUser;
    }
}