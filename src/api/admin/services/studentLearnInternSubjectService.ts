import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { AppDataSource } from "../../../ormconfig";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";


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
        academic_id: number,
        semester_id: number,
    ) {
        const qb = this.studentLearnInternRes
            .createQueryBuilder('studentLearnIntern')
            .leftJoin('studentLearnIntern.internSubject', 'internSubject')
            .leftJoinAndSelect('studentLearnIntern.student', 'student')
            .leftJoinAndSelect('student.user_person', 'userPerson')
            .where('internSubject.teacher_id = :teacherId', { teacherId })
            .andWhere('internSubject.semester_id = :semester_id', { semester_id })
            .andWhere('internSubject.academic_year = :academic_id', { academic_id })
        const data = await qb.getMany();
        return data;
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
            .where('department.school_id = :schoolId', { schoolId });

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