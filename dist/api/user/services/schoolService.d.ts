import { Semester } from "../../../database/entities/Semester";
import { AcademicYear } from "../../../database/entities/AcademicYear";
import { FindOneOptions } from "typeorm";
export declare class SchoolService {
    private academicYearRespository;
    private semesterRespository;
    getAcademicYear: () => Promise<AcademicYear[]>;
    getOneAcademicYear: (filter?: FindOneOptions<AcademicYear>) => Promise<AcademicYear>;
    getSemester: () => Promise<Semester[]>;
    getOneSemester: (filter?: FindOneOptions<Semester>) => Promise<Semester>;
}
