

import { Request, Response } from "express";
import * as Joi from "joi";
import { BusinessService } from "../services/businessService";
import { InternJobService } from "../services/internService";
import { InternStatus } from "../../../database/entities/InternJob";

const internJobs = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: userId } });
        if (!business) {
            return res.status(401).json('bạn không phải là doanh nghiệp');
        }

        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const issv = new InternJobService();
        const data = await issv.internJobs(
            business.id,
            value.page,
            value.limit,
        )
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateInternJob = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const id = parseInt(req.params.id);
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: userId } });
        if (!business) {
            return res.status(401).json('bạn không phải là doanh nghiệp');
        }
        const issv = new InternJobService();
        const internJob = await issv.getOne({ where: { id: id } });
        if (!internJob) {
            return res.status(400).json('Intern job not found');
        }
        const schema = Joi.object({
            start_date: Joi.date().required(),
            finished_date: Joi.date().optional(),
            is_interning: Joi.string().valid(...Object.values(InternStatus)).required(),
            appreciation_file: Joi.string().required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        Object.assign(value, internJob);
        const data = await issv.save(internJob);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const internJobController = {
    internJobs,
    updateInternJob,
}