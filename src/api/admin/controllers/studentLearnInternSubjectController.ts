import { Request, Response } from "express";
import { StudentLearInternService } from "../services/studentLearnInternSubjectService";
import * as Joi from "joi";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";
import { RegistStatus } from "../../../database/entities/StudentLearnIntern";


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
    const learnInternId = parseInt(req.params.id);
    const schema = Joi.object({
        regist_status: Joi.string().valid(...Object.values(RegistStatus)).required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const { regist_status } = value;
    const studentLearnInternService = new StudentLearInternService();
    const checkPermisstion = await studentLearnInternService.getOne({
        where: {
            id: learnInternId
        },
        relations: [
            'internSubject',
            'internSubject.department'
        ]
    })
    if (checkPermisstion?.internSubject?.department?.school_id !== schoolId) {
        return res.status(400).json('Bạn không có quyền cập nhật');
    }
    const result = await studentLearnInternService.update({
        id: learnInternId
    }, {
        regist_status: regist_status
    })
    if (!result) {
        return res.status(401).json('Bạn chưa cập nhật được trạng thái đăng ký');
    }
    return res.status(200).json(result);
}

export const studentLearnInternController = {
    getStudentLearnInternSubject,
    updateLearnIntern,
}