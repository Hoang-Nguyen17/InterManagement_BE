"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const Semester_1 = require("../../../database/entities/Semester");
const AcademicYear_1 = require("../../../database/entities/AcademicYear");
const ormconfig_1 = require("../../../ormconfig");
class SchoolService {
    constructor() {
        this.academicYearRespository = ormconfig_1.AppDataSource.getRepository(AcademicYear_1.AcademicYear);
        this.semesterRespository = ormconfig_1.AppDataSource.getRepository(Semester_1.Semester);
        this.getAcademicYear = async () => {
            const result = await this.academicYearRespository.find();
            return result;
        };
        this.getOneAcademicYear = async (filter) => {
            return await this.academicYearRespository.findOne(filter);
        };
        this.getSemester = async () => {
            const result = await this.semesterRespository.find();
            return result;
        };
        this.getOneSemester = async (filter) => {
            return await this.semesterRespository.findOne(filter);
        };
    }
}
exports.SchoolService = SchoolService;
//# sourceMappingURL=schoolService.js.map