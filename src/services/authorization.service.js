
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

    async authorizeFacebookUser(req, res) {
        try {
            if (req.user && req.user.id) {
                const existingUser = await this.userService.checkUserExists(req.user.id);

                if (existingUser && existingUser.id) {
                    this.tokenHandlerService.verifyToken(existingUser.fbjwttoken).then((activeUser) => {
                        if (activeUser && activeUser.id) {
                            // user is active
                            res.send(req.user);
                        }
                    }, async (err) => {
                        //update token
                        const generatedtoken = this.tokenHandlerService.createToken(req.user);
                        const updatedUser = await this.userService.updateUserToken(generatedtoken, req.user);
                        res.send(updatedUser);
                    });
                }
                else {
                    //create token and add user in db
                    const token = this.tokenHandlerService.createToken(req.user)
                    const newUser = await this.userService.createUser(req.user, token);
                    res.send(newUser);
                }

            }
        } catch (error) {
            throw error;
        }
    }
}