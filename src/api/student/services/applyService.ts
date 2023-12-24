import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Applies } from "../../../database/entities/Applies";


export class ApplyService {
    private applyRes = AppDataSource.getRepository(Applies);

    create(data: DeepPartial<Applies>) {
        return this.applyRes.create(data);
    }

    async save(data: DeepPartial<Applies>): Promise<Applies> {
        return await this.applyRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Applies>) {
        return await this.applyRes.find(filter);
    }

    async softRemove(Applies: Applies) {
        return await this.applyRes.softRemove(Applies);
    }

    public getOne = async (filter?: FindOneOptions<Applies>) => {
        return await this.applyRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<Applies>) {
        return await this.applyRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<Applies>,
        data: DeepPartial<Applies>
    ): Promise<Boolean> {
        const result = await this.applyRes.update(where, data);
        return !!result.affected;
    }
}