import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { PassStatus, RegistStatus, StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { AppDataSource } from "../../../ormconfig";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";
import { InternStatus } from "../../../database/entities/InternJob";
import { status } from "src/common/constants/status.constant";


export class StudentLearInternService {
    private studentLearnInternRes = AppDataSource.getRepository(StudentLearnIntern);


    create(data: DeepPartial<StudentLearnIntern>) {
        return this.studentLearnInternRes.create(data);
    }

    async save(data: DeepPartial<StudentLearnIntern[]>): Promise<StudentLearnIntern[]> {
        return await this.studentLearnInternRes.save(data);
    }

    async update(
        where: FindOptionsWhere<StudentLearnIntern>,
        data: DeepPartial<StudentLearnIntern>
    ): Promise<Boolean> {
        const result = await this.studentLearnInternRes.update(where, data);
        return !!result.affected;
    }

    async getAll(filter?: FindOneOptions<StudentLearnIntern>) {
        return await this.studentLearnInternRes.find(filter);
    }

    async softRemove(StudentLearnIntern: StudentLearnIntern[]) {
        return await this.studentLearnInternRes.softRemove(StudentLearnIntern);
    }

    public getOne = async (filter?: FindOneOptions<StudentLearnIntern>) => {
        return await this.studentLearnInternRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<StudentLearnIntern>) {
        return await this.studentLearnInternRes.delete(condition);
    }

    async getStudentLearnInternByTeacherId(
        teacherId: number,
        academic_id?: number,
        semester_id?: number,
        passed_status?: PassStatus,
    ) {
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
            .andWhere('student_learn_intern.regist_status=:status', { status: RegistStatus.SUCCESSED })


        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id })
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id })
        }
        if (passed_status) {
            qb.andWhere('studentLearnIntern.passed_status = :passed_status', { passed_status })
        }

        const data = await qb.getMany();
        return data;
    }

    async getStudentLearnInternByTeacherIdAndInternJobStatus(
        teacherId: number,
        intern_job_status?: InternStatus,
        academic_id?: number,
        semester_id?: number,
    ) {
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
            .andWhere('internJob.is_interning = :intern_job_status', { intern_job_status })

        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id })
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id })
        }

        const data = await qb.getMany();
        return data;
    }

    async updateScore(
        learnInternId: number,
        score: number,
        teacherId: number,
    ) {

        let result = false;
        const learnIntern = await this.studentLearnInternRes
            .createQueryBuilder('learn')
            .leftJoin('learn.internSubject', 'internSubject')
            .where('learn.id = :learnInternId', { learnInternId })
            .andWhere('internSubject.teacher_id = :teacherId', { teacherId })
            .getOne();
        if (!learnIntern) {
            return { result, learnIntern };
        } else if (learnIntern.passed_status !== PassStatus.STUDYING) {
            return { result, learnIntern }
        }

        let status = PassStatus.STUDYING;
        if (score >= 5) {
            status = PassStatus.PASSED;
        } else {
            status = PassStatus.FAILED;
        }
        learnIntern.score = score;
        learnIntern.passed_status = status;
        await this.studentLearnInternRes.save(learnIntern);
        result = true;
        return { result, learnIntern };
    }

    async updateStatusPass(
        teacherId: number,
        academic_year: number,
        semester_id: number,
    ) {
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
            return { result, length }
        }
        let scoreIsNull = 0;
        learnInterns.forEach((learnIntern) => {
            if (!learnIntern.score) {
                scoreIsNull++;
            } else if (learnIntern.score >= 5) {
                learnIntern.passed_status = PassStatus.PASSED;
            } else if (learnIntern.score < 5) {
                learnIntern.passed_status = PassStatus.FAILED;
            }
        })
        if (scoreIsNull) {
            return { result, length };
        }
        await this.save(learnInterns);
        result = true;
        return { result, length };
    }

    async getStudentLearnIntern(schoolId: number, filter: IStudentLearnInternSubject) {
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
            .andWhere('student_learn_intern.regist_status=:status', { status: RegistStatus.SUCCESSED })
        if (academic_id) {
            qb.andWhere('internSubject.academic_year = :academic_id', { academic_id })
        }
        if (semester_id) {
            qb.andWhere('internSubject.semester_id = :semester_id', { semester_id })
        }
        if (search_text) {
            qb.andWhere(new Brackets((qb) => {
                qb
                    .orWhere('userPerson.full_name LIKE :search_text')
                    .orWhere('internSubject.name Like :search_text')
            })).setParameters({ search_text: `%${search_text}% ` });
        }

        const [items, total] = await qb
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();
        return { items, total };
    }
}