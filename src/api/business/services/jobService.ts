import { Job } from "../../../../src/database/entities/Job";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
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
    }

    async update(
        where: FindOptionsWhere<Job>,
        data: DeepPartial<Job>
    ): Promise<Boolean> {
        const result = await this.jobRes.update(where, data);
        return !!result.affected;
    }

    async jobs(filter: FilterJob): Promise<{ items: Job[], total: number }> {
        const { page, limit, businessId, search_text } = filter;
        const qb = await this.jobRes
            .createQueryBuilder('job')
            .innerJoinAndSelect('job.business', 'business')
            .innerJoinAndSelect('business.user_person', 'personBusiness')
            .leftJoinAndSelect('job.position', 'position')
            .leftJoinAndSelect('job.jobSkills', 'jobSkills')
            .leftJoinAndSelect('jobSkills.skill', 'skill')
            .loadRelationCountAndMap('job.count_apply', 'job.applies')

        if (businessId) {
            qb.andWhere('business.id = :businessId', { businessId });
        }

        if (search_text) {
            qb.andWhere(new Brackets((qb) => {
                qb
                    .orWhere('job.job_name LIKE :searchText')
                    .orWhere('job.requirements LIKE :searchText')
            })).setParameters({ searchtext: search_text });
        }
        console.log(qb.getQuery());

        const [items, total] = await qb.offset((page - 1) * limit).take(limit).orderBy('job.createdAt', 'DESC').getManyAndCount();
        return { items, total };
    }

    async averageRateJob(jobId: number) {
        const job = await this.jobRes
            .createQueryBuilder('job')
            .select('job.id')
            .addSelect([
                'AVG(apply.rate_point) AS AVERAGE_RATE_POINT',
                'apply.rate_point',
            ])
            .leftJoin('job.applies', 'apply')
            .where('job.id = :jobId', { jobId })
            .groupBy('job.id')
            .getRawOne();

        const jobUpdate = await this.getOneJob({ where: job.job_id });
        jobUpdate.average_rate = parseFloat(job.AVERAGE_RATE_POINT)
        const result = await this.saveJob(jobUpdate);
        return result;
    }
}