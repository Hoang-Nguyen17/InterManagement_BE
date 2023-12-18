"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MajorService = void 0;
const Major_1 = require("../../../database/entities/Major");
const ormconfig_1 = require("../../../ormconfig");
class MajorService {
    constructor() {
        this.majorRes = ormconfig_1.AppDataSource.getRepository(Major_1.Major);
    }
    async getMajors() {
        const majors = await this.majorRes.find();
        return majors;
    }
}
exports.MajorService = MajorService;
//# sourceMappingURL=majorService.js.map