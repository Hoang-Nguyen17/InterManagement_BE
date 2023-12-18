import { Request, Response } from "express";
export declare const schoolController: {
    getAcademicYear: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSemester: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
