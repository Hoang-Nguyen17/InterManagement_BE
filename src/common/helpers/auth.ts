import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import jwtObj from '../../config/jwt';

export class Auth {
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
            const user = isLogin.userData;
            if (isLogin.result) return next(user);
            return new NotFoundException({detail: 'không tìm thấy tài khoản của bạn'});
        }
        return new NotFoundException({ detail: 'Unauthorized' });
    };
}