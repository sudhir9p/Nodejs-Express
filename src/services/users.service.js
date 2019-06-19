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
        this.validateUser();
        const currentUser = { id: user.id, email: user.emails[0].value, fbjwttoken: token, username: user.displayName, };
        const result = await this.userModel.add(currentUser);
        return result;
    }

    async getUserByEmail(emailId) {
        const currentUser = await this.userModel.getByUserEmail(emailId);
        return currentUser;
    }

    validateUser(user) {
        if (!user.id)
            throw new Error("User id is required.");
        if (user.emails.length == 0)
            throw new Error("User email is required.");
        if (!user.displayName)
            throw new Error("User name is required.");
    }
}