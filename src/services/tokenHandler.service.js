import jwt from 'jsonwebtoken';
import { jwtkey } from '../../config/config.json';
import { expressJwt } from 'express-jwt';
import { UsersModel } from '../models/user.model';


export class JWTTokenService {
    constructor() {
        this.userModel = new UsersModel();
    }

    createToken(user) {
        const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '30m' });
        return token;
    }


    authenticateToken() {
        expressJwt({
            secret: jwtkey,
            requestProperty: 'auth',
            getToken: function (req) {
                if (req.headers['x-auth-token']) {
                    return req.headers['x-auth-token'];
                }
                return null;
            }
        });
    }
}