import jwt from 'jsonwebtoken';
import { jwtkey, tokenExpiration } from '../../config/config.json';
import { UsersModel } from '../models/user.model';


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