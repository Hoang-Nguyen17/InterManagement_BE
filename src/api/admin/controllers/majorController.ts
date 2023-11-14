import { Request, Response } from "express";
import { MajorService } from "../services/majorService";

const getMajors = (req: Request, res: Response) => {
    try {
        const majorService = new MajorService();
        const data = majorService.getMajors();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

export const majorController = {
    getMajors,
}