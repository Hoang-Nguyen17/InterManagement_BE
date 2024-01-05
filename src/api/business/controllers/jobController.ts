import { Request, Response } from "express";
import * as Joi from "joi";
import { BadRequestException } from "@nestjs/common";
import { BusinessService } from "../services/businessService";
import { JobService } from "../services/jobService";
import { FilterJob } from "../interfaces/job.interface";
import { In, Like } from "typeorm";
import { WorkSpace, WorkType } from "../../../database/entities/Job";
import { PositionService } from "../services/positionService";
import { JobSkillService } from "../services/jobSkillService";
import { SkillService } from "../services/skillService";
import { UserService } from "../../admin/services/userService";

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
            salary: Joi.number().min(0).required(),
            image: Joi.string().max(500).optional(),
            work_type: Joi.string().valid(...Object.values(WorkType)).optional(),
            work_space: Joi.string().valid(...Object.values(WorkSpace)).optional(),
            expire_date: Joi.date().min(new Date()).required(),
            experience_years: Joi.number().min(0),
            job_name: Joi.string().max(50).required(),
            job_desc: Joi.string().required(),
            requirements: Joi.string().required(),
            another_information: Joi.string().optional(),
            vacancies: Joi.number().required(),
            position_id: Joi.number().optional(),
            skillIds: Joi.array().items(
                Joi.number(),
            ).optional(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const js = new JobService();
        const { skillIds, ...newJob } = value;
        if (newJob.position_id) {
            const ps = new PositionService();
            const position = await ps.getOne({ where: { id: newJob.position_id } });
            if (!position) return res.status(400).json('Không tồn tại position');
        }

        const job = js.createJob({ ...newJob, business_id: business.id });
        let result;

        const jobSkillservice = new JobSkillService();
        const skillService = new SkillService()
        if (skillIds?.length) {

        }
        if (job.id) {
            const oldData = await js.getOneJob({ where: { id: job.id, business_id: business.id } });
            if (!oldData) {
                return res.status(400).json('job không tồn tại');
            }
            const jobSkill = await jobSkillservice.getAll({ where: { job_id: job.id } });
            await jobSkillservice.softRemove(jobSkill);
        }
        result = await js.saveJob(job);
        if (skillIds.length) {
            const skillValids = await skillService.getAll({ where: { id: In(skillIds) } });
            const jobkills = skillValids?.map((skill) => {
                return jobSkillservice.create({
                    job_id: result.id,
                    skill_id: skill.id,
                })
            })
            jobkills.length && await jobSkillservice.save(jobkills)
        }

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getJobs = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const schema = Joi.object({
            businessId: Joi.number().optional(),
            search_text: Joi.string().optional(),
            page: Joi.number().min(1).default(1),
            limit: Joi.number().min(0).default(10),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });

        const filter: FilterJob = value;
        if (student) {
            filter.studentId = student.id;
        }
        const js = new JobService();
        const jobs = await js.jobs(filter);
        return res.status(200).json(jobs);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getJobById = async (req: Request, res: Response) => {
    try {
        const jobId = parseInt(req.params.id);
        const js = new JobService();
        const job = await js.getOneJob({
            where: {
                id: jobId,
            },
            relations: [
                'position',
                'jobSkills',
                'jobSkills.skill',
                'applies',
                'business',
                'business.user_person',
            ]
        });
        const id = req.userData.id;
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });
        if (student) {
            job.isApplied = job.applies.some((apply) => apply.student_id === student.id)
        }
        return res.status(200).json(job);
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

// position
const getPosition = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            search_text: Joi.string().optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const positionService = new PositionService();
        const whereClause = value.search_text ? { position_name: Like(`%${value.search_text}%`) } : null;
        const positions = await positionService.getAll({ where: whereClause })

        return res.status(200).json(positions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const savePosition = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            position_name: Joi.string().required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const positionService = new PositionService();
        const position = positionService.create(value);
        const result = await positionService.save(position);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

// skill for job
const getSkills = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            search_text: Joi.string().optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const skillService = new SkillService();
        const whereClause = value.search_text ? { skill_name: Like(`%${value.search_text}%`) } : null;
        const skills = await skillService.getAll({ where: whereClause })

        return res.status(200).json(skills);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}
const saveSkill = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            skill_name: Joi.string().required(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const skillService = new SkillService();
        const skill = skillService.create(value);
        const result = await skillService.save(skill);

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

export const jobController = {
    saveJob,
    getJobs,
    getJobById,
    deleteJobs,

    getSkills,
    saveSkill,

    getPosition,
    savePosition,
}