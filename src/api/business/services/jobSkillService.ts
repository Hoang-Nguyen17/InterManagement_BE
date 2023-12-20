import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions } from "typeorm";
import { JobSkill } from "../../../database/entities/JobSkill";


export class JobSkillService {
    private jobSkillRes = AppDataSource.getRepository(JobSkill);

    create(data: DeepPartial<JobSkill>) {
        return this.jobSkillRes.create(data);
    }

    async save(data: DeepPartial<JobSkill[]>): Promise<JobSkill[]> {
        return await this.jobSkillRes.save(data);
    }

    async getAll(filter?: FindOneOptions<JobSkill>) {
        return await this.jobSkillRes.find(filter);
    }

    async softRemove(JobSkill: JobSkill[]) {
        return await this.jobSkillRes.softRemove(JobSkill);
    }

    public getOne = async (filter?: FindOneOptions<JobSkill>) => {
        return await this.jobSkillRes.findOne(filter);
    }
}