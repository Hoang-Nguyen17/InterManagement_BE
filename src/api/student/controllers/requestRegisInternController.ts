import { Request, Response } from "express"
import * as Joi from "joi";
import { UserService } from "../../../api/admin/services/userService";
import { ApplyService } from "../services/applyService";
import { JobService } from "../../business/services/jobService";
import { SchoolService } from "../../admin/services/schoolService";
import { StudentRequestRegistInternService } from "../../admin/services/StudentRequestRegisInternService";

const requestRegisInterns = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }
    const sv = new StudentRequestRegistInternService();


    const data = await sv.getAll({ where: { student_id: student.id } });
    return res.status(200).json(data);
}

const saveRequest = async (req: Request, res: Response) => {
    const { id, schoolId } = req.userData;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }

    const sv = new StudentRequestRegistInternService();
    const data = sv.create({
        student_id: student.id,
        school_id: schoolId,
    })

    const result = await sv.save(data);
    return res.status(200).json(result);
}

const deleteRequest = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const requestId = parseInt(req.params.id);
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }
    const sv = new StudentRequestRegistInternService();
    const request = await sv.getOne({ where: { id: requestId, student_id: student.id } });
    if (!request) {
        return res.status(400).json('Không tồn tại request');
    }
    const result = await sv.softRemove(request);
    return res.status(200).json(result);
}

export const StudentRequestRegistIntern = {
    requestRegisInterns,
    saveRequest,
    deleteRequest,
}