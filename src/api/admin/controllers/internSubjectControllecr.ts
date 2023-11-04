import { Request, Response } from "express";
import Joi from "joi";
import { InternSubject } from "../../../database/entities/InternSubject";
import { SchoolService } from "../services/schoolService";


const saveInternSubject = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            id: Joi.number().optional(),
            name: Joi.string().required(),
            unit: Joi.number().required(),
            sessions: Joi.number().required(),
            max_students: Joi.number().required(),
            teacher_id: Joi.number().required(),
            department_id: Joi.number().required(),
            academic_year: Joi.number().required(),
            semester_id: Joi.number().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().greater(Joi.ref('start_date')).required()
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });

        const internSubject = new InternSubject();
        Object.assign(internSubject, value);

        const ss = new SchoolService();
        const result = await ss.saveInternSubject(internSubject);
        if (!result) return res.status(400).json({ detail: 'hãy kiểm tra lại thông tin' });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getInternSubject = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            academic_year: Joi.number(),
            semester_id: Joi.number(),
            teacher_id: Joi.number(),
            department_id: Joi.number(),
            search: Joi.string(),

            take: Joi.number().default(10),
            page: Joi.number().min(1).default(1),
        });

        const { error, value } = schema.validate(req.query);
        if (error) return res.status(400).json(error);

        const ss = new SchoolService();
        const data = await ss.getInternSubjects(value);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    saveInternSubject,
    getInternSubject,
}