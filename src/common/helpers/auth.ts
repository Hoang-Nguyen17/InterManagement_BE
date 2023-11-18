import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import jwtObj from '../../config/jwt';
import { role } from '../constants/status.constant';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userData?: JwtPayload;
        }
    }
}

export default class Auth {
    public isLogin = async (accessToken: string) => {
        let resultData: any = {};
        resultData.result = false;
        if (accessToken) {
            try {
                resultData.userData = jwt.verify(accessToken, jwtObj.secret);
                resultData.result = true;
            } catch (err) {
                resultData.result = false;
            }
        }
        return resultData;
    };

    public auth = async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const isLogin = await this.isLogin(token);
            if (isLogin.result) {
                req['userData'] = isLogin.userData;
                return next();
            }
            return res.status(404).json({ detail: 'không tìm thấy tài khoản của bạn' });
        }
        return res.status(404).json({ detail: 'Unauthorized' });
    };

    public authAdmin = async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const isLogin = await this.isLogin(token);
            console.log(isLogin);
            if (isLogin.result && isLogin.userData.userType == role.admin) {
                req['userData'] = isLogin.userData;
                return next()
            };
            return res.status(404).json({ detail: 'không tìm thấy tài khoản của bạn' });
        }
        return res.status(404).json({ detail: 'Unauthorized' });
    };
}