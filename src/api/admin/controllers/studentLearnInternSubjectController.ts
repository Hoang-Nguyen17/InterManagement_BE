import { Request, Response } from "express";
import { StudentLearInternService } from "../services/studentLearnInternSubjectService";
import * as Joi from "joi";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";


const getStudentLearnInternSubject = async (req: Request, res: Response) => {
    const { schoolId } = req.userData;
    const schema = Joi.object({
        search_text: Joi.string().optional(),
        semester_id: Joi.number().optional(),
        academic_id: Joi.number().optional(),
        page: Joi.number().default(1).optional(),
        limit: Joi.number().default(20).optional(),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const filter: IStudentLearnInternSubject = value;

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnIntern(schoolId, filter);
    return res.status(200).json(data);
}

const updateLearnIntern = async (req: Request, res: Response) => {
    const schoolId = req.userData.schoolId;
    return;
}

export const studentLearnInternController = {
    getStudentLearnInternSubject,
    updateLearnIntern,
}