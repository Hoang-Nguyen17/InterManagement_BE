import { Business } from "../../../../src/database/entities/Business";
import { DeepPartial, FindOneOptions } from "typeorm";
import { filter } from "../interfaces/busnessInterface";
export declare class BusinessService {
    private businessRepository;
    create(data: DeepPartial<Business>): Business;
    save(data: DeepPartial<Business>): Promise<Business>;
    getAll(filter?: FindOneOptions<Business>): Promise<Business[]>;
    getOne: (filter?: FindOneOptions<Business>) => Promise<Business>;
    getBusiness: (filter: filter) => Promise<{
        business: Business[];
        count: number;
    }>;
    getBusinessById: (id: number) => Promise<Business>;
}
