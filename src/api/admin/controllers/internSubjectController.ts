import { Request, Response } from "express";
import Joi from "joi";
import { InternSubject } from "../../../database/entities/InternSubject";
import { SchoolService } from "../services/schoolService";
import { ERROR_SUBJECT } from "../../../common/error/subject.error";
import { InternSubjectService } from "../services/internSubjectService";


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

        const internalSubjectService = new InternSubjectService();
        const result = await internalSubjectService.saveInternSubject(internSubject);
        if (!result) return res.status(400).json({ detail: ERROR_SUBJECT.SOMETHING_WRONG });
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

        const internalSubjectService = new InternSubjectService();
        const data = await internalSubjectService.getSubjectDetail(value);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getSubjectDetails = async (req: Request, res: Response) => {
    try {
        const subjectId = parseInt(req.params.id);
        if (!subjectId) return res.status(404).json({ detail: ERROR_SUBJECT.MISS_SUBJECT_ID });

        const internalSubjectService = new InternSubjectService();
        const subject = await internalSubjectService.getSubjectDetail(subjectId);
        if (!subject) return res.status(404).json({ detail: ERROR_SUBJECT.NOT_FOUND });

        return res.status(200).json(subject);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const deleteInternSubjects = async (req: Request, res: Response) => {
    try {
        const scheam = Joi.object({
            ids: Joi.array().items(
                Joi.number(),
            ).required(),
        })

        const { error, value } = scheam.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });

        const internalSubjectService = new InternSubjectService();
        const result = await internalSubjectService.deleteInternSubjects(value.ids);
        if (result) return res.status(404).json({ detail: ERROR_SUBJECT.NOT_FOUND });
        return res.status(200).json(true);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

export const internSubjectController = {
    saveInternSubject,
    getInternSubject,
    getSubjectDetails,
    deleteInternSubjects,
}