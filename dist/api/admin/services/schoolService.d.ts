import { Department } from "../../../database/entities/Department";
import { Program } from "../../../database/entities/Program";
import { School } from "../../../database/entities/School";
import { Class } from "../../../database/entities/Class";
import { InternSubject } from "../../../database/entities/InternSubject";
import { FindOneOptions, DeepPartial } from "typeorm";
import { FilterClass } from "../interfaces/class.interface";
import { Major } from "../../../database/entities/Major";
import { FilterMajor } from "../interfaces/major.interface";
import { AcademicYear } from "../../../database/entities/AcademicYear";
import { FilterAcademicYear } from "../interfaces/academic-year.interface";
import { Semester } from "../../../database/entities/Semester";
export declare class SchoolService {
    private schoolRepository;
    private programRepository;
    private departmentRepository;
    private majorRepository;
    private classRepository;
    private internSubjectRespository;
    private academicYearRes;
    private semesterRes;
    getSchool: (schoolId: number) => Promise<School>;
    getOneDepartment: (filter?: FindOneOptions<Department>) => Promise<Department>;
    getOneProgram: (filter?: FindOneOptions<Program>) => Promise<Program>;
    getOneClass: (filter?: FindOneOptions<Class>) => Promise<Class>;
    getOneMajor: (filter?: FindOneOptions<Major>) => Promise<Major>;
    getOneInternSubject: (filter?: FindOneOptions<InternSubject>) => Promise<InternSubject>;
    checkMajorBySchoolId: (schoolId: number, majorId: number) => Promise<Major>;
    checkClassBySchoolId: (schoolId: number, classId: number) => Promise<Class>;
    getPrograms: (schoolId: number) => Promise<Program[]>;
    getProgram: (schoolId: number, programId: number) => Promise<Program>;
    saveProgram: (program: Program) => Promise<Program>;
    deleteProgram: (schoolId: number, programId: number) => Promise<Boolean>;
    getDepartments: (schoolId: number) => Promise<Department[]>;
    getDepartment: (schoolId: number, departmentId: number) => Promise<Department>;
    saveDepartment: (department: Department) => Promise<Department>;
    deleteDepartment: (schoolId: number, departmentId: number) => Promise<Boolean>;
    saveClass: (Class: Class) => Promise<Class>;
    deletClass: (classId: number) => Promise<boolean>;
    getClasses: (filter: FilterClass) => Promise<{
        data: Class[];
        total: number;
    }>;
    createMajor(data: DeepPartial<Major>): Major;
    saveMajor(data: DeepPartial<Major>): Promise<Major>;
    getAllMajor(filter?: FindOneOptions<Major>): Promise<Major[]>;
    softDeleteMajor(ids: number[]): Promise<import("typeorm").UpdateResult>;
    majors(filter: FilterMajor): Promise<{
        items: Major[];
        total: number;
    }>;
    createAcademicYear(data: DeepPartial<AcademicYear>): AcademicYear;
    saveAcademicYear(data: DeepPartial<AcademicYear>): Promise<AcademicYear>;
    getAllAcademicYear(filter?: FindOneOptions<AcademicYear>): Promise<AcademicYear[]>;
    softDeleteAcademicYear(ids: number[]): Promise<import("typeorm").UpdateResult>;
    getOneAcademicYear: (filter?: FindOneOptions<AcademicYear>) => Promise<AcademicYear>;
    academicYears(filter: FilterAcademicYear): Promise<{
        items: AcademicYear[];
        total: number;
    }>;
    createSemester(data: DeepPartial<Semester>): Semester;
    saveSemester(data: DeepPartial<Semester>): Promise<Semester>;
    getOneSemester: (filter?: FindOneOptions<AcademicYear>) => Promise<AcademicYear>;
    getAllSemester(filter?: FindOneOptions<Semester>): Promise<Semester[]>;
    softDeleteSemester(ids: number[]): Promise<import("typeorm").UpdateResult>;
}
