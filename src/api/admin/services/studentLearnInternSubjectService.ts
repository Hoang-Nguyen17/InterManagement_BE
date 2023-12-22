import { Brackets } from "typeorm";
import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { AppDataSource } from "../../../ormconfig";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";


export class StudentLearInternService {
    private studentLearnInternRes = AppDataSource.getRepository(StudentLearnIntern);

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

        const data = await qb
            .offset((page - 1) * limit)
            .limit(limit)
            .getManyAndCount();
        return data;
    }
}