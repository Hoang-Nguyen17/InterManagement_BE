import { Brackets, DeepPartial, FindManyOptions, FindOneOptions, In } from "typeorm";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "../../../ormconfig";
import { Business } from "../../../database/entities/Business";
import { FilterBusiness } from "../interfaces/business.interface";
import { FIlterSchoolLinkedBusiness } from "../interfaces/school-linked-business.interface";
import { SchoolLinkedBusiness } from "../../../database/entities/SchoolLinkedBusiness";
import { UserPerson } from "../../../database/entities/UserPerson";

export class ManageAppService {
    private schoolRes = AppDataSource.getRepository(School);
    private bussnessRes = AppDataSource.getRepository(Business);
    private schoolLinkedBusinessRes = AppDataSource.getRepository(SchoolLinkedBusiness);
    private userRes = AppDataSource.getRepository(UserPerson);


    createSchool(data: DeepPartial<School>) {
        return this.schoolRes.create(data);
    }

    async saveSchool(data: DeepPartial<School>): Promise<School> {
        return await this.schoolRes.save(data);
    }

    async getOneSchool(filter?: FindOneOptions<School>) {
        return await this.schoolRes.findOne(filter);
    }

    async getAllSchool(filter?: FindManyOptions<School>) {
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

    async schoolLinkedBusinesses(filter: FIlterSchoolLinkedBusiness): Promise<{ items: School[], total: number }> {
        const { page, limit, status, search_text } = filter;
        const qb = await this.schoolRes
            .createQueryBuilder('school')
            .leftJoinAndSelect('school.schoolLinkedBusiness', 'linked')
            .leftJoinAndSelect('linked.business', 'business')
            .leftJoinAndSelect('business.user_person', 'userPerson')
            .where('linked.status = :status', { status });

        if (search_text) {
            qb.andWhere(new Brackets((qb) => {
                qb.orWhere('school.school_name like :search_text')
                    .orWhere('userPerson.full_name like :search_text')
            })).setParameters({ search_text: `%${search_text}%` })
        }

        const [items, total] = await qb.offset((page - 1) * limit).limit(limit).getManyAndCount();
        return { items, total };
    }

    async adminSchools(
        search_text: string = null,
        school_id: number = null,
        page: number = 1,
        limit: number = 10,
    ) {
        const qb = this.userRes
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.administrator', 'administrator')
            .leftJoinAndSelect('administrator.school', 'school');
        if (school_id) {
            qb.andWhere('school.id = :school_id', { school_id });
        }
        if (search_text) {
            qb.andWhere(new Brackets((qb) => {
                qb.orWhere('user.full_name like :search_text')
            })).setParameters({ search_text: `%${search_text}%` });
        }
        const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
        return { items, total };
    }
}