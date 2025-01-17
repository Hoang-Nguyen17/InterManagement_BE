import { Request, Response } from "express"
import * as Joi from "joi";
import { StudentLearInternService } from "../../admin/services/studentLearnInternSubjectService";
import { UserService } from "../../admin/services/userService";
import { StudentService } from "../services/studentService";
import { InternStatus } from "../../../database/entities/InternJob";
import { PassStatus } from "../../../database/entities/StudentLearnIntern";

const studentLearnInterns = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        semester_id: Joi.number().optional(),
        academic_year: Joi.number().optional(),
        passed_status:  Joi.string()
        .valid(...Object.values(PassStatus))
        .optional(),
    })

    const { error, value } = schema.validate(req.query);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnInternByTeacherId(
        teacher.id,
        value.academic_year,
        value.semester_id,
        value.passed_status
    );

    return res.status(200).json(data);
}

const getStudentLearnInternByTeacherIdAndInternJobStatus = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        semester_id: Joi.number().optional(),
        academic_year: Joi.number().optional(),
        intern_job_status:  Joi.string()
        .valid(...Object.values(InternStatus))
        .required(),
    })

    const { error, value } = schema.validate(req.query);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.getStudentLearnInternByTeacherIdAndInternJobStatus(
        teacher.id,
        value.intern_job_status,
        value.academic_year,
        value.semester_id,
    );

    return res.status(200).json(data);
}

const updateScore = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const learnInternId = parseInt(req.params.lid);
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        score: Joi.number().min(0).max(10).required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.updateScore(
        learnInternId,
        value.score,
        teacher.id,
    )
    if (!(data.result || data.learnIntern)) {
        return res.status(400).json('student learn intern not found')
    } else if (!data.result && data.learnIntern) {
        return res.status(400).json('not modified score');
    }
    return res.status(200).json(data.learnIntern);
}

const updateAllStatusStudentLearnIntern = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }
    const schema = Joi.object({
        semester_id: Joi.number().required(),
        academic_year: Joi.number().required(),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const studentLearnInternService = new StudentLearInternService()
    const data = await studentLearnInternService.updateStatusPass(
        teacher.id,
        value.academic_year,
        value.semester_id,
    )
    console.log(data);
    if (!(data.result || data.length)) {
        return res.status(400).json('student learn intern not found');
    } else if (!data.result && data.length) {
        return res.status(400).json('Please grade all students')
    }
    return res.status(200).json(data.result);
}

const getStudentDetail = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const stduentId = parseInt(req.params.id);
    const us = new UserService()
    const teacher = await us.getOneTeacher({ where: { user_id: id } });
    if (!teacher) {
        return res.status(400).json('You do not have permission to access this');
    }

    const sv = new StudentService()
    const student = await sv.getOne({
        where: {
            id: stduentId,
        }, 
        relations: [
            'user_person',
            'studentLearnIntern',
            'report',
        ]
    })

    if (!student) {
        return res.status(400).json('student not found');
    }
    return res.status(200).json(student);
}

export const studentLearnInternController = {
    studentLearnInterns,
    updateScore,
    updateAllStatusStudentLearnIntern,
    getStudentDetail,
    getStudentLearnInternByTeacherIdAndInternJobStatus
}