import { Request, Response } from "express";
import * as Joi from "joi";
import { SchoolService } from "../services/schoolService";
import { Program } from "../../../database/entities/Program";

const getSchool = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const data = await ss.getSchool();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const saveProgram = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const program: Program = value;
        const ss = new SchoolService();
        const data = await ss.saveProgram(program);
        if (!data) return res.status(401).json({ detail: 'Thêm chương trình học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const updateProgram = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const program: Program = value;
        const ss = new SchoolService();
        const data = await ss.saveProgram(program);
        if (!data) return res.status(401).json({ detail: 'Cập nhật chương trình học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getPrograms = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const data = await ss.getPrograms();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

module.exports = {
    getSchool,
    saveProgram,
    updateProgram,
    getPrograms,
}