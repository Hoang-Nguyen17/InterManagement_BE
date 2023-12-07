import { Request, Response } from "express";
export declare const internSubjectController: {
    saveInternSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getInternSubjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteInternSubjects: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
