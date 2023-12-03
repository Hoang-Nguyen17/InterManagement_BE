import { Request, Response, NextFunction } from 'express';
import { NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import jwtObj from '../../config/jwt';
import { role } from '../constants/status.constant';
import { JwtPayload } from 'jsonwebtoken';
import { UserService } from '../../api/admin/services/userService';

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
            return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
        }
        return res.status(403).json({ detail: 'Unauthorized' });
    };

    public verifyAuthSchool = async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const isLogin = await this.isLogin(token);
            if (isLogin.result) {
                const schoolId = parseInt(req.params.id);
                if (schoolId !== isLogin.userData?.schoolId) return res.status(400).json({ detail: 'bạn không có quyền truy cập' });
                req['userData'] = isLogin.userData;
                return next();
            }
            return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
        }
        return res.status(403).json({ detail: 'Unauthorized' });
    };

    public authAdmin = async (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization;
            const isLogin = await this.isLogin(token);
            if (isLogin.result && isLogin.userData.userType == role.admin) {
                req['userData'] = isLogin.userData;
                return next()
            };
            return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
        }
        return res.status(403).json({ detail: 'Unauthorized' });
    };


    public verifyAdminSchool = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.headers.authorization) {
                const token = req.headers.authorization;
                const isLogin = await this.isLogin(token);
                const schoolId = parseInt(req.params.id);
                if (!schoolId) return res.status(403).json({ detail: 'thiếu schoolId' });

                if (isLogin.result && isLogin.userData.userType == role.admin) {
                    const schoolId = parseInt(req.params.id);
                    if (schoolId !== isLogin.userData.schoolId) return res.status(400).json({ detail: 'bạn không có quyền truy cập' });

                    req['userData'] = isLogin.userData;
                    return next()
                };
                return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
            }
            return res.status(403).json({ detail: 'Unauthorized' });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    };
}