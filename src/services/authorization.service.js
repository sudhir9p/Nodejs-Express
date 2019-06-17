
export class AuthService {
    constructor(tokenService, userService) {
        this.tokenHandlerService = tokenService;
        this.userService = userService;
    }

    async authorizeUser(email) {
        const user = await this.userService.getUserByEmail(email);
        const currentUser = user && user[0] && user[0].toObject();
        if (currentUser && currentUser.fbjwttoken) {
            const activeUser = await this.tokenHandlerService.verifyToken(currentUser.fbjwttoken);
            if (activeUser && activeUser.id) {
                return true;
            }
            else
                return false;
        }
        else
            throw new Error("User not registered , please visist /auth/facebook");
    }

    async isAuthenticated(req, res, next) {
        if (req.header("useremail")) {
            const isAuthorized = await this.authorizeUser(req.header("useremail"));
            if (isAuthorized)
                next();
            else
                res.status(400).send("User token expired.Please login again /auth/facebook");
        }
        else
            throw new Error("useremail header is required.");
    }
}