import { Request, Response } from "express";
export declare const schoolController: {
    getSchool: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    saveProgram: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProgram: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getPrograms: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProgram: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProgram: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getDepartments: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    saveDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteDepartment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    saveClass: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateClass: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getClasses: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteClass: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
