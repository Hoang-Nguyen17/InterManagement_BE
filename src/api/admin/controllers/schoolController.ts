import { Request, Response } from "express";
import { schooService } from "./userController";

const getSchools = async (req: Request, res: Response, user) => {
    try {
        const ss = new schooService()
        return await ss.getSchools();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    getSchools,
}