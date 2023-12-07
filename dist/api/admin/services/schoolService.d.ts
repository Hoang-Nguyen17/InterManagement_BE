import { Department } from "../../../database/entities/Department";
import { Program } from "../../../database/entities/Program";
import { School } from "../../../database/entities/School";
import { Class } from "../../../database/entities/Class";
import { InternSubject } from "../../../database/entities/InternSubject";
import { FindOneOptions } from "typeorm";
import { FilterClass } from "../interfaces/class.interface";
export declare class SchoolService {
    private shcoolRepository;
    private programRepository;
    private departmentRepository;
    private classRepository;
    private internSubjectRespository;
    private userService;
    private userSchoolService;
    getSchool: (schoolId: number) => Promise<School>;
    getPrograms: (schoolId: number) => Promise<Program[]>;
    getProgram: (schoolId: number, programId: number) => Promise<Program>;
    saveProgram: (program: Program) => Promise<Program>;
    deleteProgram: (schoolId: number, programId: number) => Promise<Boolean>;
    getDepartments: (schoolId: number) => Promise<Department[]>;
    getOneDepartment: (filter?: FindOneOptions<Department>) => Promise<Department>;
    getDepartment: (schoolId: number, departmentId: number) => Promise<Department>;
    saveDepartment: (department: Department) => Promise<Department>;
    deleteDepartment: (schoolId: number, departmentId: number) => Promise<Boolean>;
    saveClass: (Class: Class) => Promise<Class>;
    deletClass: (classId: number) => Promise<boolean>;
    getClasses: (filter: FilterClass) => Promise<{
        data: Class[];
        total: number;
    }>;
    getOneClass: (filter?: FindOneOptions<Class>) => Promise<Class>;
    getOneInternSubject: (filter?: FindOneOptions<InternSubject>) => Promise<InternSubject>;
}
