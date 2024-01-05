import { InternJob } from "../../../../src/database/entities/InternJob";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";


export class InternJobService {
    private internJobRes = AppDataSource.getRepository(InternJob);

    create(data: DeepPartial<InternJob>) {
        return this.internJobRes.create(data);
    }

    async save(data: DeepPartial<InternJob>): Promise<InternJob> {
        return await this.internJobRes.save(data);
    }

    async getAll(filter?: FindOneOptions<InternJob>) {
        return await this.internJobRes.find(filter);
    }

    async softRemove(jobs: InternJob[]) {
        return await this.internJobRes.softRemove(jobs);
    }

    public getOne = async (filter?: FindOneOptions<InternJob>) => {
        return await this.internJobRes.findOne(filter);
    }

    async internJobs(
        businessId: number,
        page: number = 1,
        limit: number = 10,
    ) {
        const qb = this.internJobRes
            .createQueryBuilder('internJob')
            .innerJoinAndSelect('internJob.student', 'student')
            .innerJoinAndSelect('student.user_person', 'user_person')
            .leftJoinAndSelect('internJob.apply', 'apply')
            .leftJoin('apply.job', 'job')
            .where('job.business_id = :businessId', { businessId })
        const [items, total] = await qb.skip((page - 1) * limit).getManyAndCount()
        return { items, total };
    }
}