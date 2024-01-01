import { DetailTodo } from "../../../database/entities/DetailTodo";
import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";


export class DetailTodoService {
    private detailTodoRes = AppDataSource.getRepository(DetailTodo);

    create(data: DeepPartial<DetailTodo>) {
        return this.detailTodoRes.create(data);
    }

    async save(data: DeepPartial<DetailTodo>): Promise<DetailTodo> {
        return await this.detailTodoRes.save(data);
    }

    async getAll(filter?: FindOneOptions<DetailTodo>) {
        return await this.detailTodoRes.find(filter);
    }

    async softRemove(DetailTodo: DetailTodo) {
        return await this.detailTodoRes.softRemove(DetailTodo);
    }

    public getOne = async (filter?: FindOneOptions<DetailTodo>) => {
        return await this.detailTodoRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<DetailTodo>) {
        return await this.detailTodoRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<DetailTodo>,
        data: DeepPartial<DetailTodo>
    ): Promise<Boolean> {
        const result = await this.detailTodoRes.update(where, data);
        return !!result.affected;
    }
}