import { Request, Response } from "express";
import * as Joi from "joi";
import { BadRequestException } from "@nestjs/common";
import { BusinessService } from "../services/businessService";
import { JobService } from "../services/jobService";
import { FilterJob } from "../interfaces/job.interface";
import { In } from "typeorm";

// ---------------------------- job -------------------------------
const saveJob = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: userId } });
        if (!business) {
            return res.status(401).json('bạn không phải là doanh nghiệp');
        }

        const schema = Joi.object({
            id: Joi.number().min(1).optional(),
            image: Joi.string().max(500).required(),
            job_name: Joi.string().max(50).required(),
            job_desc: Joi.string().required(),
            requirements: Joi.string().required(),
            another_information: Joi.string().optional(),
            vacancies: Joi.number().optional(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const js = new JobService();
        const job = js.createJob({ ...value, business_id: business.id });
        let result;

        if (job.id) {
            const oldData = await js.getOneJob({ where: { id: job.id, business_id: business.id } });
            if (!oldData) {
                return res.status(400).json('job không tồn tại');
            }
        }
        result = await js.saveJob(job);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getJobs = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            businessId: Joi.number().optional(),
            search_text: Joi.string().optional(),
            page: Joi.number().min(1).default(1),
            limit: Joi.number().min(0).default(10),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FilterJob = value;
        const js = new JobService();
        const jobs = await js.jobs(filter);
        return res.status(200).json(jobs);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteJobs = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: userId } });
        if (!business) {
            return res.status(401).json('bạn không phải là doanh nghiệp');
        }

        const schema = Joi.array().items(Joi.number()).required();

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const js = new JobService();

        const jobs = await js.getAllJob({ where: { id: In(value), business_id: business.id } });
        const result = await js.softRemoveJobs(jobs);
        if (!result.length) {
            return res.status(400).json('job không tồn tại');
        }
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

export const jobController = {
    saveJob,
    getJobs,
    deleteJobs,
}