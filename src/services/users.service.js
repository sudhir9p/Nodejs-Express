import { UsersModel } from '../models/user.model'

export class UsersService {
    constructor() {
        this.userModel = new UsersModel();
    }


    async checkUserExists(userId) {
        const currentUser = await this.userModel.getById(userId);
        return currentUser;
    }

    async updateUserToken(token, user) {
        user.token = token;
        const result = await this.userModel.update(user);
        return result;
    }

    async createUser(user, token) {
        const currentUser = { id: user.id, email: user.emails[0].value, userName: user.displayName, fbjwttoken: token };
        const result = await this.userModel.add(currentUser);
        return result;
    }

    async getUserByEmail(emailId) {
        const currentUser = await this.userModel.getByUserEmail(emailId);
        return currentUser;
    }
}