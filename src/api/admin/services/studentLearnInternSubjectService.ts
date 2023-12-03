import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { AppDataSource } from "../../../ormconfig";
import { IStudentLearnInternSubject } from "../interfaces/studentLearnInternFilter.interface";


export class StudentLearInternService {
    private studentLearnInternRes = AppDataSource.getRepository(StudentLearnIntern);

    async getStudentLearnIntern(filter: IStudentLearnInternSubject = null) {
        const qb = this.studentLearnInternRes
            .createQueryBuilder('student_learn_intern')
            .leftJoinAndSelect('student_learn_intern.board', 'board')
            .leftJoinAndSelect('student_learn_intern.student', 'student')
            .leftJoinAndSelect('student_learn_intern.internSubject', 'internSubject')

        const data = await qb
            .skip((filter.page - 1) * filter.limit)
            .take(filter.limit)
            .getManyAndCount();
        return data;
    }
}