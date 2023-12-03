import { Request, Response } from "express"
import { SchoolService } from "../services/schoolService";

const getAcademicYear = async (req: Request, res: Response) => {
    const ss = new SchoolService();
    const data = await ss.getAcademicYear();
    return res.status(200).json(data);
}

const getSemester = async (req: Request, res: Response) => {
    const ss = new SchoolService();
    const data = await ss.getSemester();
    return res.status(200).json(data);
}

export const schoolController = {
    getAcademicYear,
    getSemester,
}