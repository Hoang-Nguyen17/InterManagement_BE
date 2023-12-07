"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternSubjectService = void 0;
const typeorm_1 = require("typeorm");
const InternSubject_1 = require("../../../database/entities/InternSubject");
const ormconfig_1 = require("../../../ormconfig");
const userService_1 = require("./userService");
const schoolService_1 = require("./schoolService");
const schoolService_2 = require("../../user/services/schoolService");
class InternSubjectService {
    constructor() {
        this.internSubjectRes = ormconfig_1.AppDataSource.getRepository(InternSubject_1.InternSubject);
        this.userService = new userService_1.UserService();
        this.schoolService = new schoolService_1.SchoolService();
        this.userSchoolService = new schoolService_2.SchoolService();
    }
    async save(data) {
        return await this.internSubjectRes.save(data);
    }
    async getOne(filter) {
        return await this.internSubjectRes.findOne(filter);
    }
    async deleteInternSubjects(subjectIds, schoolId) {
        const subjects = await this.internSubjectRes.createQueryBuilder('subject')
            .leftJoinAndSelect('subject.department', 'department')
            .where('subject.id In (:...ids)', { ids: subjectIds })
            .andWhere('department.school_id = :schoolId', { schoolId })
            .getMany();
        return await this.internSubjectRes.softRemove(subjects);
    }
    async getInternSubjects(filter) {
        const qb = this.internSubjectRes
            .createQueryBuilder('subject')
            .leftJoinAndSelect('subject.teacher', 'teacher')
            .leftJoinAndSelect('teacher.user_person', 'userPerson')
            .leftJoinAndSelect('subject.department', 'department')
            .leftJoinAndSelect('subject.academicYear', 'academicYear')
            .leftJoinAndSelect('subject.semester', 'semester');
        filter.academic_year && qb.andWhere('subject.academic_year = :academicYear', { academicYear: filter.academic_year });
        filter.semester_id && qb.andWhere('subject.semester_id = :semester', { semester: filter.semester_id });
        filter.department_id && qb.andWhere('subject.department_id = :departmentId', { departmentId: filter.department_id });
        filter.search && qb.andWhere(new typeorm_1.Brackets((qb) => {
            qb
                .orWhere('subject.name ILIKE :searchText', { searchText: filter.search })
                .orWhere('userPerson.full_name ILIKE :searchtext', { searchText: filter.search })
                .orWhere('department.department_name ILIKE :searchText', { searchText: filter.search });
        }));
        const data = await qb.orderBy('subject.createdAt', 'DESC').getMany();
        return data;
    }
    async saveInternSubject(InternSubject) {
        const result = await this.save(InternSubject);
        return result;
    }
}
exports.InternSubjectService = InternSubjectService;
//# sourceMappingURL=internSubjectService.js.map