import { TodoAppreciation } from "../../../database/entities/TodoAppreciation";
import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";


export class TodoAppreciationService {
    private todoApprecitionRes = AppDataSource.getRepository(TodoAppreciation);

    create(data: DeepPartial<TodoAppreciation>) {
        return this.todoApprecitionRes.create(data);
    }

    async save(data: DeepPartial<TodoAppreciation[]>): Promise<TodoAppreciation[]> {
        return await this.todoApprecitionRes.save(data);
    }

    async getAll(filter?: FindOneOptions<TodoAppreciation>) {
        return await this.todoApprecitionRes.find(filter);
    }

    async softRemove(TodoAppreciation: TodoAppreciation) {
        return await this.todoApprecitionRes.softRemove(TodoAppreciation);
    }

    public getOne = async (filter?: FindOneOptions<TodoAppreciation>) => {
        return await this.todoApprecitionRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<TodoAppreciation>) {
        return await this.todoApprecitionRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<TodoAppreciation>,
        data: DeepPartial<TodoAppreciation>
    ): Promise<Boolean> {
        const result = await this.todoApprecitionRes.update(where, data);
        return !!result.affected;
    }
}