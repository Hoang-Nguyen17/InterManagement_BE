import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions } from "typeorm";
import { Skill } from "../../../database/entities/skill";


export class SkillService {
    private skillRes = AppDataSource.getRepository(Skill);

    create(data: DeepPartial<Skill>) {
        return this.skillRes.create(data);
    }

    async save(data: DeepPartial<Skill>): Promise<Skill> {
        return await this.skillRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Skill>) {
        return await this.skillRes.find(filter);
    }

    async softRemove(Skill: Skill[]) {
        return await this.skillRes.softRemove(Skill);
    }

    public getOne = async (filter?: FindOneOptions<Skill>) => {
        return await this.skillRes.findOne(filter);
    }
}