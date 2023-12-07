import { Request, Response } from "express";
import { StudentLearInternService } from "../services/studentLearnInternSubjectService";
import * as Joi from "joi";


const saveStudentLearnInternSubject = (req: Request, res: Response) => {
    try {
        

        const scheam = Joi.object({

        })
        const studentLearnInternService = new StudentLearInternService()

    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getStudentLearnInternSubject = async (req: Request, res: Response) => {
    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnIntern();
    return res.status(200).json(data);
}

export const studentLearnInternController = {
    saveStudentLearnInternSubject,
    getStudentLearnInternSubject,
}