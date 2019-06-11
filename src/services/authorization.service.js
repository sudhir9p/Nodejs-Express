
export class AuthService {
    constructor(tokenService, userService) {
        this.tokenHandlerService = tokenService;
        this.userService = userService;
    }

    async authorizeUser(email) {
        const user = await this.userService.getUserByEmail(email);
        console.log('jkdjfkjdxzkcjkxzc ' + user);
        if (user && user.fbjwttoken) {
            const activeUser = await this.tokenHandlerService.verifyToken(user.fbjwttoken);
            if (activeUser && activeUser.id) {
                return true;
            }
            else
                return false;
        }
        else
            throw new Error("User not registered , please visist /auth/facebook");
    }
}