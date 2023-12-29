import { Request, Response } from "express"
import * as Joi from "joi";
import { StudentLearnInternService } from "../services/studentLearnInternService";
import { UserService } from "../../../api/admin/services/userService";

// Student learn Intern
const learnInternDetail = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const us = new UserService();

        const student = await us.getOneStudent({ where: { user_id: userId }, relations: ['major'] });
        if (!student) {
            return res.status(400).json('Bạn không phải sinh viên của trường này');
        }
        const sv = new StudentLearnInternService();
        const result = await sv.getOne({
            where: {
                student_id: student.id
            },
            relations: [
                'board',
                'internSubject',
            ],
            order: {
                createdAt: 'DESC'
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const saveLearnIntern = async (req: Request, res: Response) => {
    try {
        const user = req.userData;
        const us = new UserService();

        const student = await us.getOneStudent({ where: { user_id: user.id }, relations: ['major'] });
        if (!student) {
            return res.status(400).json('Bạn không phải sinh viên của trường này');
        }
        const internSubjectId = parseInt(req.params.id);
        const sv = new StudentLearnInternService();
        const checkRegister = await sv.checkRegister(user.schoolId, internSubjectId, student);
        if (!checkRegister) {
            return res.status(400).json('Bạn không được phép đăng ký môn học này');
        }
        const data = sv.create({ student_id: student.id, subject_id: internSubjectId });
        const result = await sv.save([data]);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const deleteLearnIntern = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: userId } });
    if (!student) {
        return res.status(400).json('Không phải sinh viên');
    }
    const learnInternId = parseInt(req.params.lid);
    const sv = new StudentLearnInternService();
    const result = await sv.delete({ student_id: student.id, id: learnInternId });
    if (!result.affected) {
        return res.status(401).json('Không tìm thấy phần đăng ký của bạn');
    }
    return res.status(200).json(result);
}
export const InternSubjectController = {
    learnInternDetail,
    saveLearnIntern,
    deleteLearnIntern,
}