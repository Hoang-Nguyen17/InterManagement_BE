import { UserAccount } from "../../../database/entities/UserAccount";
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";
import { FindOneOptions } from "typeorm";
export declare class UserService {
    private userAccountRepository;
    private userPersonRepository;
    private teacherRepository;
    private studentRepository;
    private businessRepository;
    isExistsEmail: (email: string) => Promise<string>;
    saveUser: (userAccount: UserAccount, userPerson: UserPerson) => Promise<UserAccount>;
    saveTeacher: (teacher: Teacher) => Promise<Teacher>;
    saveStudent: (student: Student) => Promise<Student>;
    saveBusiness: (business: Business) => Promise<Business>;
    getOneTeacher: (filter?: FindOneOptions<Teacher>) => Promise<Teacher>;
    getOneUser: (filter?: FindOneOptions<UserPerson>) => Promise<UserPerson>;
    getOneStudent: (filter?: FindOneOptions<Student>) => Promise<Student>;
    getAdministrator: (schoolId: number) => Promise<UserPerson[]>;
    getTeachers: (schoolId: number, page: number, limit: number) => Promise<{
        data: UserPerson[];
        total: number;
    }>;
    getStudents: (schoolId: number, page: number, limit: number) => Promise<{
        data: UserPerson[];
        total: number;
    }>;
}
