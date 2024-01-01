import { Conversation } from "../../../database/entities/Conversation";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";


export class ConversationService {
    private conversationRes = AppDataSource.getRepository(Conversation);

    create(data: DeepPartial<Conversation>) {
        return this.conversationRes.create(data);
    }

    async save(data: DeepPartial<Conversation>): Promise<Conversation> {
        return await this.conversationRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Conversation>) {
        return await this.conversationRes.find(filter);
    }

    async softRemove(Conversations: Conversation[]) {
        return await this.conversationRes.softRemove(Conversations);
    }

    async getOne(filter?: FindOneOptions<Conversation>) {
        return await this.conversationRes.findOne(filter);
    }

    async update(
        where: FindOptionsWhere<Conversation>,
        data: DeepPartial<Conversation>
    ): Promise<Boolean> {
        const result = await this.conversationRes.update(where, data);
        return !!result.affected;
    }

    async conversations(businessId: number = null, studentId: number = null) {
        const qb = this.conversationRes
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.student', 'student')
            .leftJoinAndSelect('student.user_person', 'userStudent')
            .leftJoinAndSelect('conversation.business', 'business')
            .leftJoinAndSelect('business.user_person', 'userBusiness')
            .leftJoin('conversation.detailConversation', 'message')

        if (businessId) {
            qb.andWhere('conversation.business_id = :businessId', { businessId })
        }
        if (studentId) {
            qb.andWhere('conversation.student_id = :studentId', { studentId })
        }

        qb.orderBy('message.createdAt', 'DESC')
        const data = await qb.getMany();
        return data;
    }
}