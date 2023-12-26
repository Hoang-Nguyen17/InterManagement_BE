import { AppDataSource } from "../../../ormconfig";
import { Brackets, DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { InternSubjectService } from "../../admin/services/internSubjectService";
import { Student } from "src/database/entities/Student";


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