import { Request, Response } from "express";

const getMajors = (req: Request, res: Response) => {
    try {
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

export const majorController = {
    getMajors,
}