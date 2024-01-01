import { DetailConversation } from "../../../database/entities/DetailConversation";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";


export class MessageService {
    private messageRes = AppDataSource.getRepository(DetailConversation);

    create(data: DeepPartial<DetailConversation>) {
        return this.messageRes.create(data);
    }

    async save(data: DeepPartial<DetailConversation>): Promise<DetailConversation> {
        return await this.messageRes.save(data);
    }

    async getAll(filter?: FindOneOptions<DetailConversation>) {
        return await this.messageRes.find(filter);
    }

    async softRemove(DetailConversation: DetailConversation[]) {
        return await this.messageRes.softRemove(DetailConversation);
    }

    public getOne = async (filter?: FindOneOptions<DetailConversation>) => {
        return await this.messageRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<DetailConversation>,
        data: DeepPartial<DetailConversation>
    ): Promise<Boolean> {
        const result = await this.messageRes.update(where, data);
        return !!result.affected;
    }
}