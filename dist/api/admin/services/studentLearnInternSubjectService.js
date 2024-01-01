"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentLearInternService = void 0;
const typeorm_1 = require("typeorm");
const StudentLearnIntern_1 = require("../../../database/entities/StudentLearnIntern");
const ormconfig_1 = require("../../../ormconfig");
class StudentLearInternService {
    constructor() {
        this.studentLearnInternRes = ormconfig_1.AppDataSource.getRepository(StudentLearnIntern_1.StudentLearnIntern);
        this.getOne = async (filter) => {
            return await this.studentLearnInternRes.findOne(filter);
        };
    }
    create(data) {
        return this.studentLearnInternRes.create(data);
    }
    async save(data) {
        return await this.studentLearnInternRes.save(data);
    }
    async update(where, data) {
        const result = await this.studentLearnInternRes.update(where, data);
        return !!result.affected;
    }
    async getAll(filter) {
        return await this.studentLearnInternRes.find(filter);
    }
    async softRemove(StudentLearnIntern) {
        return await this.studentLearnInternRes.softRemove(StudentLearnIntern);
    }
    async delete(condition) {
        return await this.studentLearnInternRes.delete(condition);
    }
    async getStudentLearnIntern(schoolId, filter) {
        const { search_text, semester_id, academic_id, page, limit } = filter;
        const qb = this.studentLearnInternRes
            .createQueryBuilder('student_learn_intern')
            .leftJoinAndSelect('student_learn_intern.board', 'board')
            .leftJoinAndSelect('student_learn_intern.student', 'student')
            .leftJoinAndSelect('student.user_person', 'userPerson')
            .leftJoinAndSelect('student_learn_intern.internSubject', 'internSubject')
            .leftJoinAndSelect('internSubject.teacher', 'teacher')
            .leftJoinAndSelect('internSubject.department', 'department')
            .where('department.school_id = :schoolId', { schoolId });
        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id });
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id });
        }
        if (search_text) {
            qb.andWhere(new typeorm_1.Brackets((qb) => {
                qb
                    .orWhere('userPerson.full_name LIKE :search_text')
                    .orWhere('internSubject.name Like :search_text');
            })).setParameters({ search_text: `%${search_text}% ` });
        }
        const [items, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { items, total };
    }
}
exports.StudentLearInternService = StudentLearInternService;
//# sourceMappingURL=studentLearnInternSubjectService.js.map