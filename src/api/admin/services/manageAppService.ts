import { Brackets, DeepPartial, FindOneOptions, In } from "typeorm";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "../../../ormconfig";
import { Business } from "../../../database/entities/Business";
import { FilterBusiness } from "../interfaces/business.interface";

export class ManageAppService {
    private schoolRes = AppDataSource.getRepository(School);
    private bussnessRes = AppDataSource.getRepository(Business);

    createSchool(data: DeepPartial<School>) {
        return this.schoolRes.create(data);
    }

    async saveSchool(data: DeepPartial<School>): Promise<School> {
        return await this.schoolRes.save(data);
    }

    async getOneSchool(filter?: FindOneOptions<School>) {
        return await this.schoolRes.findOne(filter);
    }

    async getAllSchool(filter?: FindOneOptions<School>) {
        return await this.schoolRes.find(filter);
    }

    async softDeleteSchools(ids: number[]) {
        return await this.schoolRes.softDelete({ id: In(ids) });
    }

    createBusiness(data: DeepPartial<Business>) {
        return this.bussnessRes.create(data);
    }

    async saveBusiness(data: DeepPartial<Business>): Promise<Business> {
        return await this.bussnessRes.save(data);
    }

    async getOneBusiness(filter?: FindOneOptions<Business>) {
        return await this.bussnessRes.findOne(filter);
    }

    async softDeleteBusinesses(ids: number[]) {
        return await this.bussnessRes.softDelete({ id: In(ids) });
    }

    async bussnesses(filter: FilterBusiness): Promise<{ items: Business[], total: number }> {
        const { page, limit, search_text } = filter;
        const qb = await this.bussnessRes
            .createQueryBuilder('business')
            .leftJoinAndSelect('business.user_person', 'userPerson')

        if (search_text) {
            qb.where(new Brackets((qb) => {
                qb.orWhere('business.industry_sector LIKE :search_text')
                    .orWhere('business.representator LIKE :search_text')
                    .orWhere('userPerson.full_name LIKE :search_text')
            })).setParameter(search_text, `%${search_text}%`);
        }

        const [items, total] = await qb.offset((page - 1) * limit).take(limit).getManyAndCount();
        return { items, total };
    }
}