import { Request, Response } from "express"
import { SchoolService } from "../services/schoolService";

const getAcademicYear = async (req: Request, res: Response) => {
    const ss = new SchoolService();
    const data = await ss.getAcademicYear();
    if (!data?.length) return res.status(401).json();
    return res.status(200).json(data);
}

const getSemester = async (req: Request, res: Response) => {
    const ss = new SchoolService();
    const data = await ss.getSemester();
    if (!data?.length) return res.status(401).json();
    return res.status(200).json(data);
}

module.exports = {
    getAcademicYear,
    getSemester,
}