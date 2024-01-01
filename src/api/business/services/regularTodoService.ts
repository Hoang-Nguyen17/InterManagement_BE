import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { RegularTodo } from "../../../database/entities/RegularTodo";


export class RegularTodoService {
    private regularTodoRes = AppDataSource.getRepository(RegularTodo);

    create(data: DeepPartial<RegularTodo>) {
        return this.regularTodoRes.create(data);
    }

    async save(data: DeepPartial<RegularTodo>): Promise<RegularTodo> {
        return await this.regularTodoRes.save(data);
    }

    async getAll(filter?: FindOneOptions<RegularTodo>) {
        return await this.regularTodoRes.find(filter);
    }

    async softRemove(RegularTodo: RegularTodo) {
        return await this.regularTodoRes.softRemove(RegularTodo);
    }

    public getOne = async (filter?: FindOneOptions<RegularTodo>) => {
        return await this.regularTodoRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<RegularTodo>) {
        return await this.regularTodoRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<RegularTodo>,
        data: DeepPartial<RegularTodo>
    ): Promise<Boolean> {
        const result = await this.regularTodoRes.update(where, data);
        return !!result.affected;
    }

    async getRegularTodo (businessId: number) {
        const data = await this.regularTodoRes
            .createQueryBuilder('todo')
            .leftJoinAndSelect('todo.student', 'student')
            .leftJoinAndSelect('student.user_person', 'user_person')
            .where('todo.business_id = :businessId', { businessId })
            .getMany();
        return data;
    }
}