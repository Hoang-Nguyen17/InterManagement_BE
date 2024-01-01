import { Request, Response } from "express";
export declare const studentLearnInternController: {
    getStudentLearnInternSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateLearnIntern: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
