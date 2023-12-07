"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentLearInternService = void 0;
const StudentLearnIntern_1 = require("../../../database/entities/StudentLearnIntern");
const ormconfig_1 = require("../../../ormconfig");
class StudentLearInternService {
    constructor() {
        this.studentLearnInternRes = ormconfig_1.AppDataSource.getRepository(StudentLearnIntern_1.StudentLearnIntern);
    }
    async getStudentLearnIntern(filter = null) {
        const qb = this.studentLearnInternRes
            .createQueryBuilder('student_learn_intern')
            .leftJoinAndSelect('student_learn_intern.board', 'board')
            .leftJoinAndSelect('student_learn_intern.student', 'student')
            .leftJoinAndSelect('student_learn_intern.internSubject', 'internSubject');
        const data = await qb
            .skip((filter.page - 1) * filter.limit)
            .take(filter.limit)
            .getManyAndCount();
        return data;
    }
}
exports.StudentLearInternService = StudentLearInternService;
//# sourceMappingURL=studentLearnInternSubjectService.js.map