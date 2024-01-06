import { Brackets, DeepPartial, FindManyOptions, FindOneOptions, In } from "typeorm";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "../../../ormconfig";
import { Business } from "../../../database/entities/Business";
import { FilterBusiness } from "../interfaces/business.interface";
import { FIlterSchoolLinkedBusiness } from "../interfaces/school-linked-business.interface";
import { LinkedStatus, SchoolLinkedBusiness } from "../../../database/entities/SchoolLinkedBusiness";
import { UserPerson } from "../../../database/entities/UserPerson";
import { Administrator } from "../../../database/entities/Administrator";
import { UserAccount } from "../../../database/entities/UserAccount";

export class ManageAppService {
    private schoolRes = AppDataSource.getRepository(School);
    private bussnessRes = AppDataSource.getRepository(Business);
    private schoolLinkedBusinessRes = AppDataSource.getRepository(SchoolLinkedBusiness);
    private userRes = AppDataSource.getRepository(UserPerson);
    private adminRes = AppDataSource.getRepository(Administrator);
    private userAccoutRes = AppDataSource.getRepository(UserAccount);



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


    async saveAdmin(data: DeepPartial<Administrator>): Promise<Administrator> {
        return await this.adminRes.save(data);
    }

    createAdmin(data: DeepPartial<Administrator>) {
        return this.adminRes.create(data);
    }

    async softRemoveAdmin(JobSkill: Administrator[]) {
        return await this.adminRes.softRemove(JobSkill);
    }

    async getOneLinked(filter?: FindOneOptions<SchoolLinkedBusiness>) {
        return await this.schoolLinkedBusinessRes.findOne(filter);
    }

    async saveLinked(data: DeepPartial<SchoolLinkedBusiness>): Promise<SchoolLinkedBusiness> {
        return await this.schoolLinkedBusinessRes.save(data);
    }

    async deleteLinkedById(id: number) {
        return await this.schoolLinkedBusinessRes.delete({ id: id });
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

    async schoolLinkedBusinesses(
        schoolId: number,
        filter: FIlterSchoolLinkedBusiness,
        isLinked: Boolean = true,
    ): Promise<{ items: Business[], total: number }> {
        const { page, limit, status } = filter;
        const qb = this.bussnessRes
            .createQueryBuilder('business')
            .leftJoinAndSelect('business.user_person', 'businessPerson')

        if (isLinked) {
            qb.innerJoinAndSelect('business.schoolLinkedBusiness', 'linked')
                .innerJoinAndSelect('linked.school', 'school')
                .where('linked.school_id = :schoolId', { schoolId });
        } else {
            qb.where(`
                NOT EXISTS(
                    select 1 from school_linked_business slb
                    where slb.school_id = :schoolId 
                        and slb.business_id = business.id
                        and slb.deleted_at IS NULL
                )
            `, { schoolId });

        }

        const [items, total] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();
        return { items, total };
    }

    async getLinkedSchoolByBusinessId(
        businessId: number,
        status: LinkedStatus = null,
        page: number = 1,
        limit: number = 10,
    ) {
        const qb = this.schoolLinkedBusinessRes
            .createQueryBuilder('linked')
            .leftJoinAndSelect('linked.school', 'school')
            .where('linked.business_id = :businessId', { businessId })
            .skip((page - 1) * limit).take(limit);
        if (status) {
            qb.andWhere('linked.is_linked = :status', { status })
        }
        const [items, total] = await qb.getManyAndCount();
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
            .innerJoinAndSelect('user.administrator', 'administrator')
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

    async getAdminById(id: number) {
        const qb = this.userRes
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.administrator', 'administrator')
            .leftJoinAndSelect('administrator.school', 'school')
            .where('administrator.id = :id', { id })
        return qb.getOne();
    }

    async softDeleteAdminById(id: number) {
        const admin = await this.adminRes.findOne({ where: { id: id }, relations: ['user_person'] });
        if (!admin) {
            return false;
        }
        await this.adminRes.softDelete({ id: id });
        await this.userRes.softDelete({ id: admin.user_id });
        await this.userAccoutRes.softDelete({ username: admin.user_person.username });
        return true;
    }
}