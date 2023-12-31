import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { RegistStatus, StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { InternSubjectService } from "../../admin/services/internSubjectService";
import { Student } from "../../../database/entities/Student";
import { InternSubject } from "../../../database/entities/InternSubject";


export class StudentLearnInternService {
    private stulearnInternRes = AppDataSource.getRepository(StudentLearnIntern);
    private InternSubjectService = new InternSubjectService();

    create(data: DeepPartial<StudentLearnIntern>) {
        return this.stulearnInternRes.create(data);
    }

    async save(data: DeepPartial<StudentLearnIntern[]>): Promise<StudentLearnIntern[]> {
        return await this.stulearnInternRes.save(data);
    }

    async getAll(filter?: FindOneOptions<StudentLearnIntern>) {
        return await this.stulearnInternRes.find(filter);
    }

    async softRemove(StudentLearnIntern: StudentLearnIntern[]) {
        return await this.stulearnInternRes.softRemove(StudentLearnIntern);
    }

    public getOne = async (filter?: FindOneOptions<StudentLearnIntern>) => {
        return await this.stulearnInternRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<StudentLearnIntern>) {
        return await this.stulearnInternRes.delete(condition);
    }

    async isExistRegister(studentId: number, internSubject: InternSubject) {
        const data = await this.stulearnInternRes
            .createQueryBuilder('learnIntern')
            .leftJoin('learnIntern.student', 'student')
            .leftJoin('learnIntern.internSubject', 'internSubject')
            .where('student.id = :studentId', { studentId })
            .andWhere('learnIntern.regist_status = :status', { status: RegistStatus.SUCCESSED })
            .andWhere('internSubject.academic_year = :academicYear', { academicYear: internSubject.academic_year })
            .andWhere('internSubject.semester = :semester', { semester: internSubject.semester })
            .getOne();
        return !!data;
    }


    async checkRegister(schoolId: number, internSubjectId: number, student: Student) {
        const subject = await this.InternSubjectService.getOne({
            where: {
                id: internSubjectId
            },
            relations: ['department']
        });

        return !!(
            schoolId === subject.department.school_id
            && student.major.department_id === subject.department_id
        );
    }
}