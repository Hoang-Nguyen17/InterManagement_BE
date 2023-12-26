import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { StudentRequestRegistIntern } from "../../../database/entities/StudentRequestRegistIntern";


export class StudentRequestRegistInternService {
    private requestRegistInternRes = AppDataSource.getRepository(StudentRequestRegistIntern);

    create(data: DeepPartial<StudentRequestRegistIntern>) {
        return this.requestRegistInternRes.create(data);
    }

    async save(data: DeepPartial<StudentRequestRegistIntern>): Promise<StudentRequestRegistIntern> {
        return await this.requestRegistInternRes.save(data);
    }

    async getAll(filter?: FindOneOptions<StudentRequestRegistIntern>) {
        return await this.requestRegistInternRes.find(filter);
    }

    async softRemove(StudentRequestRegistIntern: StudentRequestRegistIntern) {
        return await this.requestRegistInternRes.softRemove(StudentRequestRegistIntern);
    }

    public getOne = async (filter?: FindOneOptions<StudentRequestRegistIntern>) => {
        return await this.requestRegistInternRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<StudentRequestRegistIntern>) {
        return await this.requestRegistInternRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<StudentRequestRegistIntern>,
        data: DeepPartial<StudentRequestRegistIntern>
    ): Promise<Boolean> {
        const result = await this.requestRegistInternRes.update(where, data);
        return !!result.affected;
    }
}