import { DeepPartial, FindOneOptions, FindOptionsWhere } from "typeorm";
import { PassStatus, StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { IStudentLearnInternSubject } from "../interfaces/student.interface";
import { InternStatus } from "../../../database/entities/InternJob";
export declare class StudentLearInternService {
    private studentLearnInternRes;
    create(data: DeepPartial<StudentLearnIntern>): StudentLearnIntern;
    save(data: DeepPartial<StudentLearnIntern[]>): Promise<StudentLearnIntern[]>;
    update(where: FindOptionsWhere<StudentLearnIntern>, data: DeepPartial<StudentLearnIntern>): Promise<Boolean>;
    getAll(filter?: FindOneOptions<StudentLearnIntern>): Promise<StudentLearnIntern[]>;
    softRemove(StudentLearnIntern: StudentLearnIntern[]): Promise<StudentLearnIntern[]>;
    getOne: (filter?: FindOneOptions<StudentLearnIntern>) => Promise<StudentLearnIntern>;
    delete(condition: FindOptionsWhere<StudentLearnIntern>): Promise<import("typeorm").DeleteResult>;
    getStudentLearnInternByTeacherId(teacherId: number, academic_id?: number, semester_id?: number, passed_status?: PassStatus): Promise<StudentLearnIntern[]>;
    getStudentLearnInternByTeacherIdAndInternJobStatus(teacherId: number, intern_job_status?: InternStatus, academic_id?: number, semester_id?: number): Promise<StudentLearnIntern[]>;
    updateScore(learnInternId: number, score: number, teacherId: number): Promise<{
        result: boolean;
        learnIntern: StudentLearnIntern;
    }>;
    updateStatusPass(teacherId: number, academic_year: number, semester_id: number): Promise<{
        result: boolean;
        length: number;
    }>;
    getStudentLearnIntern(schoolId: number, filter: IStudentLearnInternSubject): Promise<{
        items: StudentLearnIntern[];
        total: number;
    }>;
}
