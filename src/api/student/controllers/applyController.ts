import { Request, Response } from "express"
import * as Joi from "joi";
import { UserService } from "../../../api/admin/services/userService";
import { ApplyService } from "../services/applyService";
import { JobService } from "../../business/services/jobService";

const applies = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const applyService = new ApplyService();
    const userService = new UserService();

    const student = await userService.getOneStudent({ where: { user_id: userId } });
    if (!student) {
        return res.status(400).json('Không tìm thấy sinh viên');
    }

    const applies = await applyService.getAll({
        where: {
            student_id: student.id
        },
        relations: [
            'job',
            'job.business',
            'job.business.user_person',
        ]
    });
    return res.status(200).json(applies);
}

const saveApply = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const applyService = new ApplyService();
    const userService = new UserService();
    const jobService = new JobService();


    const student = await userService.getOneStudent({ where: { user_id: userId } });
    if (!student) {
        return res.status(400).json('Không tìm thấy sinh viên');
    }

    const schema = Joi.object({
        job_id: Joi.number().required(),
        cv_file: Joi.string().max(500).required(),
        introducing_file: Joi.string().max(500).optional(),
        rate_point: Joi.number().valid(1, 2, 3, 4, 5).optional(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);
    const job = await jobService.getOneJob({ where: { id: value.job_id } });
    if (!job) {
        return res.status(400).json('job không tồn tại');
    }
    const apply = applyService.create({
        ...value,
        student_id: student.id,
    })
    const result = await applyService.save(apply);
    
    return res.status(200).json(result);
}

const deleteApply = async (req: Request, res: Response) => {
    const userId = req.userData.id;
    const applyId = parseInt(req.params.id);
    const applyService = new ApplyService();
    const userService = new UserService();
    const jobService = new JobService();

    const student = await userService.getOneStudent({ where: { user_id: userId } });
    if (!student) {
        return res.status(400).json('Không tìm thấy sinh viên');
    }
    const apply = await applyService.getOne({ where: { id: applyId } });
    if (!apply) {
        return res.status(400).json('apply không tồn tại');
    }
    const result = await applyService.softRemove(apply);
    return res.status(200).json(result);
}
export const ApplyController = {
    applies,
    saveApply,
    deleteApply,
}