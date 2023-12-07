import { Request, Response } from "express";
export declare const userController: {
    login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
