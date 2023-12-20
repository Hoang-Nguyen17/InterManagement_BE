import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets, DeepPartial, FindOneOptions } from "typeorm";
import { Position } from "../../../database/entities/Position";


export class PositionService {
    private positionRes = AppDataSource.getRepository(Position);

    create(data: DeepPartial<Position>) {
        return this.positionRes.create(data);
    }

    async save(data: DeepPartial<Position>): Promise<Position> {
        return await this.positionRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Position>) {
        return await this.positionRes.find(filter);
    }

    async softRemove(Position: Position[]) {
        return await this.positionRes.softRemove(Position);
    }

    public getOne = async (filter?: FindOneOptions<Position>) => {
        return await this.positionRes.findOne(filter);
    }
}