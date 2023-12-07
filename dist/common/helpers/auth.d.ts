import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
declare global {
    namespace Express {
        interface Request {
            userData?: JwtPayload;
        }
    }
}
export default class Auth {
    isLogin: (accessToken: string) => Promise<any>;
    auth: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    verifyAuthSchool: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    authAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    verifyAdminSchool: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
}
