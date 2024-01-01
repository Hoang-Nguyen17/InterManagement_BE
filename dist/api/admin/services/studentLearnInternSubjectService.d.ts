import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";
export declare class StudentLearInternService {
    private studentLearnInternRes;
    create(data: DeepPartial<StudentLearnIntern>): StudentLearnIntern;
    save(data: DeepPartial<StudentLearnIntern[]>): Promise<StudentLearnIntern[]>;
    update(where: FindOptionsWhere<StudentLearnIntern>, data: DeepPartial<StudentLearnIntern>): Promise<Boolean>;
    getAll(filter?: FindOneOptions<StudentLearnIntern>): Promise<StudentLearnIntern[]>;
    softRemove(StudentLearnIntern: StudentLearnIntern[]): Promise<StudentLearnIntern[]>;
    getOne: (filter?: FindOneOptions<StudentLearnIntern>) => Promise<StudentLearnIntern>;
    delete(condition: FindOptionsWhere<StudentLearnIntern>): Promise<import("typeorm").DeleteResult>;
    getStudentLearnIntern(schoolId: number, filter: IStudentLearnInternSubject): Promise<{
        items: StudentLearnIntern[];
        total: number;
    }>;
}
