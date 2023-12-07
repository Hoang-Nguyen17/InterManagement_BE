import { Request, Response } from "express";
export declare const studentLearnInternController: {
    saveStudentLearnInternSubject: (req: Request, res: Response) => Response<any, Record<string, any>>;
    getStudentLearnInternSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
