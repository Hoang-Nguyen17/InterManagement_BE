



import { Request, Response } from "express";
import * as Joi from "joi";
import { InternStatus } from "../../../database/entities/InternJob";
import { InternJobService } from "../../business/services/internService";
import { UserService } from "../../admin/services/userService";

const internJobs = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const us = new UserService();
        const student = await us.getOneStudent({ where: { user_id: userId } });
        if (!student) {
            return res.status(400).json('student not found');
        }
        const issv = new InternJobService();
        const data = await issv.getAll({
            where: {
                student_id: student.id,
            }
        })

        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateInternJob = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const us = new UserService();
        const student = await us.getOneStudent({ where: { user_id: userId } });
        if (!student) {
            return res.status(400).json('student not found');
        }
        const id = parseInt(req.params.id);
        const issv = new InternJobService();
        const data = await issv.getOne({
            where: {
                id: id,
                student_id: student.id,
            }
        })
        if (!data) {
            return res.status(400).json('data not found');
        }
        if (data.is_interning !== InternStatus.WAITING) {
            return res.status(400).json('Not allowed change');
        }
        const schema = Joi.object({
            is_interning: Joi.string().valid(...Object.values(InternStatus)).required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        data.is_interning = value.is_interning;
        const result = await issv.save(data);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const internJobController = {
    internJobs,
    updateInternJob,
}