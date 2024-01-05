import { Request, Response } from "express"
import * as Joi from "joi";
import { StudentLearInternService } from "../../admin/services/studentLearnInternSubjectService";
import { UserService } from "../../admin/services/userService";

const studentLearnInterns = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        semester_id: Joi.number().optional(),
        academic_id: Joi.number().optional(),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnInternByTeacherId(
        teacher.id,
        value.academic_id,
        value.semester_id
    );
    return res.status(200).json(data);
}

const updateStudentLearnIntern = async (req: Request, res: Response) => {
    const { schoolId, id } = req.userData;
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        semester_id: Joi.number().optional(),
        academic_id: Joi.number().optional(),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnInternByTeacherId(
        teacher.id,
        value.academic_id,
        value.semester_id
    );
    return res.status(200).json(data);
}

export const studentLearnInternController = {
    studentLearnInterns,
}