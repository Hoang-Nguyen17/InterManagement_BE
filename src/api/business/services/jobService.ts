import { Job } from "../../../../src/database/entities/Job";
import { AppDataSource } from "../../../../src/ormconfig";
import {
  Brackets,
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";
import { FilterJob } from "../interfaces/job.interface";
import { Applies } from "../../../database/entities/Applies";

export class JobService {
  private jobRes = AppDataSource.getRepository(Job);

  createJob(data: DeepPartial<Job>) {
    return this.jobRes.create(data);
  }

  async saveJob(data: DeepPartial<Job>): Promise<Job> {
    return await this.jobRes.save(data);
  }

  async getAllJob(filter?: FindOneOptions<Job>) {
    return await this.jobRes.find(filter);
  }

  async softRemoveJobs(jobs: Job[]) {
    return await this.jobRes.softRemove(jobs);
  }

  public getOneJob = async (filter?: FindOneOptions<Job>) => {
    return await this.jobRes.findOne(filter);
  };

  async update(
    where: FindOptionsWhere<Job>,
    data: DeepPartial<Job>
  ): Promise<Boolean> {
    const result = await this.jobRes.update(where, data);
    return !!result.affected;
  }

  async jobs(filter: FilterJob): Promise<{ items: Job[]; total: number }> {
    const { page, limit, businessId, search_text, studentId, trending, position_id, skill_id, work_type, work_space } =
      filter;
    const qb = await this.jobRes
      .createQueryBuilder("job")
      .innerJoinAndSelect("job.business", "business")
      .innerJoinAndSelect("business.user_person", "personBusiness")
      .leftJoinAndSelect("job.position", "position")
      .leftJoinAndSelect("job.jobSkills", "jobSkills")
      .leftJoinAndSelect("jobSkills.skill", "skill")
      .leftJoin("job.applies", "apply")
      .loadRelationCountAndMap("job.count_apply", "job.applies")
      .addSelect(["apply.id", "apply.student_id"]);

    if (businessId) {
      qb.andWhere("business.id = :businessId", { businessId });
    }

    if (search_text) {
      qb.andWhere(
        new Brackets((qb) => {
          qb.orWhere("job.job_name LIKE :searchText").orWhere(
            "job.requirements LIKE :searchText"
          );
        })
      ).setParameters({ searchtext: search_text });
    }

    if (trending) {
      qb.orderBy("job.average_rate", "DESC")
        .addOrderBy("job.viewer_count", "DESC")
        .andWhere("(job.average_rate > 3.5 or job.average_rate is null)");
    }

    if (position_id) {
      qb.andWhere('job.position_id = :position_id', { position_id: position_id });
    }
    if (skill_id) {
      qb.andWhere(`EXISTS (
        select 1 
        from job_skill js
        where js.job_id = job.id
          and js.skill_id = :skill_id
          and js.deleted_at is null
      )`, { skill_id: skill_id })
    }
    if (work_type) {
      qb.andWhere('job.work_type = :work_type', { work_type })
    }
    if (work_space) {
      qb.andWhere('job.work_space = :work_space', { work_space })
    }
    const [items, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .addOrderBy("job.createdAt", "DESC")
      .getManyAndCount();
    if (studentId) {
      items.forEach((job: Job) => {
        job.isApplied = job.applies.some(
          (apply) => apply.student_id === studentId
        );
      });
    }
    return { items, total };
  }

  async getJobRecommend(filter: FilterJob) {
    const { page, limit, majorId } = filter;
    const qb = this.jobRes
      .createQueryBuilder('job')
      .addSelect((subQuery) => {
        return subQuery.select('COUNT(a.id)', 'count')
          .from(Applies, 'a')
          .where('a.job_id = job.id')
      }, 'count')
      .innerJoinAndSelect("job.business", "business")
      .innerJoinAndSelect("business.user_person", "personBusiness")
      .leftJoinAndSelect("job.position", "position")
      .leftJoin('job.applies', 'apply')
      .leftJoin('apply.student', 'student')
      .where('student.major_id = :majorId', { majorId })
      .loadRelationCountAndMap('job.count_apply', 'job.applies')
      .orderBy('count', 'DESC')

    const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
    return { items, total };
  }

  async averageRateJob(jobId: number) {
    const job = await this.jobRes
      .createQueryBuilder("job")
      .select("job.id")
      .addSelect([
        "AVG(apply.rate_point) AS AVERAGE_RATE_POINT",
        "apply.rate_point",
      ])
      .leftJoin("job.applies", "apply")
      .where("job.id = :jobId", { jobId })
      .groupBy("job.id")
      .getRawOne();

    const jobUpdate = await this.getOneJob({ where: { id: jobId } });
    jobUpdate.average_rate = parseFloat(job.AVERAGE_RATE_POINT);
    const result = await this.saveJob(jobUpdate);
    return result;
  }
}
