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
        return await this.requestRegistInternRes.find();
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

    async requests(schoolId: number, page: number, limit: number) {
        const qb = this.requestRegistInternRes.createQueryBuilder('request')
            .leftJoinAndSelect('request.student', 'student')
            .leftJoinAndSelect('student.student', 'user_person')
            .addSelect(['user_person.id', 'user_person.image', 'user_person.email', 'user_person.full_name', 'user_person.phone'])
            .where('request.school_id = :schoolId', { schoolId })
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount()
        return { items, total };
    }
}