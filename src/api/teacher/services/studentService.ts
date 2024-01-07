import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { Student } from "../../../database/entities/Student";

export class StudentService {
    private studentRes = AppDataSource.getRepository(Student);

    create(data: DeepPartial<Student>) {
        return this.studentRes.create(data);
    }

    async save(data: DeepPartial<Student>): Promise<Student> {
        return await this.studentRes.save(data);
    }

    async getAll(filter?: FindOneOptions<Student>) {
        return await this.studentRes.find();
    }

    async softRemove(Student: Student) {
        return await this.studentRes.softRemove(Student);
    }

    public getOne = async (filter?: FindOneOptions<Student>) => {
        return await this.studentRes.findOne(filter);
    }

    async delete(condition: FindOptionsWhere<Student>) {
        return await this.studentRes.delete(condition);
    }

    async update(
        where: FindOptionsWhere<Student>,
        data: DeepPartial<Student>
    ): Promise<Boolean> {
        const result = await this.studentRes.update(where, data);
        return !!result.affected;
    }

    async getStudentLearnInternByTeacherId(
        teacherId: number,
        academic_year: number,
        semester_id: number,
    ) {
        const data = await this.studentRes
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.user_person', 'user')
            .leftJoin('student.studentLearnIntern', 'studentLearnIntern')
            .leftJoin('studentLearnIntern.internSubject', 'internSubject')
            .where('internSubject.teacher_id = :teacherId', { teacherId })
            .andWhere('internSubject.academic_year = :academic_year', { academic_year })
            .andWhere('internSubject.semester_id = :semester_id', { semester_id })
            .getMany();
        return data;
    }
}