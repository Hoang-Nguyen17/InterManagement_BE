import { Business } from "../../../../src/database/entities/Business";
import { filter } from "../interfaces/busnessInterface";
export declare class BusinessService {
    private businessRepository;
    getBusiness: (filter: filter) => Promise<{
        business: Business[];
        count: number;
    }>;
    getBusinessById: (id: number) => Promise<Business>;
}
