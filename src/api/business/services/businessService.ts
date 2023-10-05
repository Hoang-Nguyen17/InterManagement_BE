import { Business } from "../../../../src/database/entities/Business";
import { AppDataSource } from "../../../../src/ormconfig";
import { Brackets } from "typeorm";
import { filter } from "../interfaces/busnessInterface";


export class BusinessService {
    private businessRepository = AppDataSource.getRepository(Business);

    public getBusiness = async (filter: filter) => {
        try {
            const query = this.businessRepository
                .createQueryBuilder('business')
                .innerJoin('business.user_person', 'userPerson')
                .skip(filter.skip)
                .take(filter.take)

            if (filter.search) {
                new Brackets((qb) => {
                    qb.where('business.industry_sector ILIKE :search', {
                        search: `%${filter.search}%`
                    })
                        .orWhere('business.short_desc ILIKE :search', {
                            search: `%${filter.search}%`
                        })
                        .orWhere('business.full_name ILIKE :search', {
                            search: `%${filter.search}%`
                        })
                        .orWhere('business.address ILIKE :search', {
                            search: `%${filter.search}%`
                        })
                        .orWhere('business.username ILIKE :search', {
                            search: `%${filter.search}%`
                        })
                });
            }

            const [business, count] = await query.getManyAndCount();
            const data = {
                business: business,
                count: count,
            }
            return data;
        } catch (e) {
            throw e;
        }
    }

    public getBusinessById = async (id: number) => {
        try {
            return await this.businessRepository.findOne({
                where: {
                    id,
                }
            });
        } catch (e) {
            throw e;
        }
    }
}