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
    async getStudentLearnInternByTeacherId(teacherId, academic_id, semester_id, passed_status) {
        const qb = this.studentLearnInternRes
            .createQueryBuilder('studentLearnIntern')
            .addSelect([
            'student.sex',
            'student.id',
        ])
            .leftJoinAndSelect('studentLearnIntern.internSubject', 'internSubject')
            .leftJoinAndSelect('studentLearnIntern.student', 'student')
            .leftJoinAndSelect('student.user_person', 'userPerson')
            .leftJoinAndSelect('student.class', 'class')
            .leftJoinAndSelect('student.Intern_job', 'internJob')
            .leftJoinAndSelect('internJob.apply', 'apply')
            .leftJoinAndSelect('apply.job', 'job')
            .where('internSubject.teacher_id = :teacherId', { teacherId })
            .andWhere('student_learn_intern.regist_status=:status', { status: StudentLearnIntern_1.RegistStatus.SUCCESSED });
        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id });
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id });
        }
        if (passed_status) {
            qb.andWhere('studentLearnIntern.passed_status = :passed_status', { passed_status });
        }
        const data = await qb.getMany();
        return data;
    }
    async getStudentLearnInternByTeacherIdAndInternJobStatus(teacherId, intern_job_status, academic_id, semester_id) {
        const qb = this.studentLearnInternRes
            .createQueryBuilder('studentLearnIntern')
            .addSelect([
            'student.sex',
            'student.id',
        ])
            .leftJoinAndSelect('studentLearnIntern.internSubject', 'internSubject')
            .leftJoinAndSelect('studentLearnIntern.student', 'student')
            .leftJoinAndSelect('student.user_person', 'userPerson')
            .leftJoinAndSelect('student.class', 'class')
            .leftJoinAndSelect('student.Intern_job', 'internJob')
            .leftJoinAndSelect('internJob.apply', 'apply')
            .leftJoinAndSelect('apply.job', 'job')
            .where('internSubject.teacher_id = :teacherId', { teacherId })
            .andWhere('internJob.is_interning = :intern_job_status', { intern_job_status });
        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id });
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id });
        }
        const data = await qb.getMany();
        return data;
    }
    async updateScore(learnInternId, score, teacherId) {
        let result = false;
        const learnIntern = await this.studentLearnInternRes
            .createQueryBuilder('learn')
            .leftJoin('learn.internSubject', 'internSubject')
            .where('learn.id = :learnInternId', { learnInternId })
            .andWhere('internSubject.teacher_id = :teacherId', { teacherId })
            .getOne();
        if (!learnIntern) {
            return { result, learnIntern };
        }
        else if (learnIntern.passed_status !== StudentLearnIntern_1.PassStatus.STUDYING) {
            return { result, learnIntern };
        }
        let status = StudentLearnIntern_1.PassStatus.STUDYING;
        if (score >= 5) {
            status = StudentLearnIntern_1.PassStatus.PASSED;
        }
        else {
            status = StudentLearnIntern_1.PassStatus.FAILED;
        }
        learnIntern.score = score;
        learnIntern.passed_status = status;
        await this.studentLearnInternRes.save(learnIntern);
        result = true;
        return { result, learnIntern };
    }
    async updateStatusPass(teacherId, academic_year, semester_id) {
        let result = false;
        const learnInterns = await this.studentLearnInternRes
            .createQueryBuilder('learnIntern')
            .leftJoin('learnIntern.internSubject', 'internSubject')
            .where('internSubject.teacher_id = :teacherId', { teacherId })
            .andWhere('internSubject.academic_year = :academic_year', { academic_year })
            .andWhere('internSubject.semester_id = :semester_id', { semester_id })
            .getMany();
        let length = learnInterns.length;
        if (!length) {
            return { result, length };
        }
        let scoreIsNull = 0;
        learnInterns.forEach((learnIntern) => {
            if (!learnIntern.score) {
                scoreIsNull++;
            }
            else if (learnIntern.score >= 5) {
                learnIntern.passed_status = StudentLearnIntern_1.PassStatus.PASSED;
            }
            else if (learnIntern.score < 5) {
                learnIntern.passed_status = StudentLearnIntern_1.PassStatus.FAILED;
            }
        });
        if (scoreIsNull) {
            return { result, length };
        }
        await this.save(learnInterns);
        result = true;
        return { result, length };
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
            .where('department.school_id = :schoolId', { schoolId })
            .andWhere('student_learn_intern.regist_status=:status', { status: StudentLearnIntern_1.RegistStatus.SUCCESSED });
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