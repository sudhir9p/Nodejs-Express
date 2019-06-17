import jwt from 'jsonwebtoken';
import { jwtkey, tokenExpiration } from '../../config/config.json';


export class JWTTokenService {
    constructor() {
    }

    createToken(user) {
        const token = jwt.sign(user, jwtkey, { expiresIn: tokenExpiration });
        return token;
    }

    async verifyToken(token) {
        const result = await jwt.verify(token, jwtkey);
        return result;
    }

}