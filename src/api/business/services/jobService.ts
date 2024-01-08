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
    const { page, limit, businessId, search_text, studentId, trending } =
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
