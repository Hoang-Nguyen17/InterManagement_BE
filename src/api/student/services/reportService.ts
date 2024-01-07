import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Report } from "../../../database/entities/Report";


export class ReportService {
    private reportRes = AppDataSource.getRepository(Report);

    create(data: DeepPartial<Report>) {
        return this.reportRes.create(data);
    }

    async save(data: DeepPartial<Report>): Promise<Report> {
        return await this.reportRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Report>) {
        return await this.reportRes.find(filter);
    }

    async softRemove(Report: Report) {
        return await this.reportRes.softRemove(Report);
    }

    public getOne = async (filter?: FindOneOptions<Report>) => {
        return await this.reportRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<Report>) {
        return await this.reportRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<Report>,
        data: DeepPartial<Report>
    ): Promise<Boolean> {
        const result = await this.reportRes.update(where, data);
        return !!result.affected;
    }
}