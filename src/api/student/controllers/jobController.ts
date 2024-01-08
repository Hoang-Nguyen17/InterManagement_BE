import { Request, Response } from "express";
import * as Joi from "joi";
import { UserService } from "../../../api/admin/services/userService";
import { ApplyService } from "../services/applyService";
import { JobService } from "../../business/services/jobService";
import { FilterJob } from "src/api/business/interfaces/job.interface";

const rateJob = async (req: Request, res: Response) => {
  const userId = req.userData.id;
  const jobId = parseInt(req.params.id);
  const applyService = new ApplyService();
  const userService = new UserService();
  const jobService = new JobService();

  const student = await userService.getOneStudent({
    where: { user_id: userId },
  });
  if (!student) {
    return res.status(400).json("Không tìm thấy sinh viên");
  }

  const schema = Joi.object({
    rate_point: Joi.number().valid(1, 2, 3, 4, 5).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json(error);
  const { rate_point } = value;

  const result = await applyService.update(
    {
      job_id: jobId,
      student_id: student.id,
    },
    {
      rate_point: rate_point,
    }
  );

  if (!result) {
    return res.status(400).json("đánh giá job thất bại");
  }
  const job = await jobService.averageRateJob(jobId);
  return res.status(200).json(job);
};

const addView = async (req: Request, res: Response) => {
  const jobId = parseInt(req.params.id);
  const jobService = new JobService();

  const job = await jobService.getOneJob({ where: { id: jobId } });
  if (!job) {
    return res.status(400).json("Không tìm thấy job");
  }
  job.viewer_count += 1;
  const result = await jobService.saveJob(job);
  return res.status(200).json(result);
};

const getJobTrending = async (req: Request, res: Response) => {
  const jobService = new JobService();

  const schema = Joi.object({
    trending: Joi.bool().default(true),
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json(error);
  const filter: FilterJob = {
    trending: value.trending,
    page: value.page,
    limit: value.limit,
  };
  const jobTrendings = await jobService.jobs(filter);
  return res.status(200).json(jobTrendings);
};
export const JobController = {
  rateJob,
  addView,
  getJobTrending,
};
