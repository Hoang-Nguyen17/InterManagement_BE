"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessService = void 0;
const Business_1 = require("../../../../src/database/entities/Business");
const ormconfig_1 = require("../../../../src/ormconfig");
const typeorm_1 = require("typeorm");
class BusinessService {
    constructor() {
        this.businessRepository = ormconfig_1.AppDataSource.getRepository(Business_1.Business);
        this.getBusiness = async (filter) => {
            try {
                const query = this.businessRepository
                    .createQueryBuilder('business')
                    .innerJoin('business.user_person', 'userPerson')
                    .skip(filter.skip)
                    .take(filter.take);
                if (filter.search) {
                    new typeorm_1.Brackets((qb) => {
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
                        });
                    });
                }
                const [business, count] = await query.getManyAndCount();
                const data = {
                    business: business,
                    count: count,
                };
                return data;
            }
            catch (e) {
                throw e;
            }
        };
        this.getBusinessById = async (id) => {
            try {
                return await this.businessRepository.findOne({
                    where: {
                        id,
                    }
                });
            }
            catch (e) {
                throw e;
            }
        };
    }
}
exports.BusinessService = BusinessService;
//# sourceMappingURL=businessService.js.map