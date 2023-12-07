import { Request, Response } from "express";
export declare const userController: {
    register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAdministrators: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getTeachers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getStudents: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
