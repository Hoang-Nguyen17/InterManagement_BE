import { Job } from "../../../../src/database/entities/Job";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions } from "typeorm";
import { FilterJob } from "../interfaces/job.interface";


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

    async jobs(filter: FilterJob): Promise<{ items: Job[], total: number }> {
        const { page, limit, businessId, search_text } = filter;
        const qb = await this.jobRes
            .createQueryBuilder('job')
            .innerJoinAndSelect('job.business', 'business')
            .innerJoinAndSelect('business', 'personBusiness')
            .leftJoinAndSelect('job.position', 'position')
            .leftJoinAndSelect('job.jobSkills', 'jobSkills')
            .leftJoinAndSelect('jobSkills.skill', 'skill')

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

        const [items, total] = await qb.offset((page - 1) * limit).take(limit).orderBy('job.createdAt', 'DESC').getManyAndCount();
        return { items, total };
    }
}