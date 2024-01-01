import { UserAccount } from "../../../database/entities/UserAccount";
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";
import { DeepPartial, FindOneOptions } from "typeorm";
import { IFilterTeacher } from "../interfaces/teacher.interface";
import { IFilterStudent } from "../interfaces/student.interface";
export declare class UserService {
    private userAccountRepository;
    private userPersonRepository;
    private teacherRepository;
    private studentRepository;
    private businessRepository;
    private schoolAdminService;
    isExistsEmail: (email: string) => Promise<string>;
    saveAccount: (userAccount: UserAccount) => Promise<UserAccount>;
    createUserAccount(data: DeepPartial<UserAccount>): UserAccount;
    saveUserPerson: (userPerson: UserPerson) => Promise<UserPerson>;
    createUserPerson(data: DeepPartial<UserPerson>): UserPerson;
    saveTeacher: (teacher: Teacher) => Promise<Teacher>;
    saveStudent: (student: Student) => Promise<Student>;
    saveBusiness: (business: Business) => Promise<Business>;
    getOneAccount: (filter?: FindOneOptions<UserAccount>) => Promise<UserAccount>;
    getOneTeacher: (filter?: FindOneOptions<Teacher>) => Promise<Teacher>;
    getOneUser: (filter?: FindOneOptions<UserPerson>) => Promise<UserPerson>;
    getOneStudent: (filter?: FindOneOptions<Student>) => Promise<Student>;
    isValidAccount: (account: UserAccount, schoolId: number) => Promise<boolean>;
    getAdministrator: (schoolId: number) => Promise<UserPerson[]>;
    getTeachers: (filter: IFilterTeacher) => Promise<{
        data: UserPerson[];
        total: number;
    }>;
    getStudents: (filter: IFilterStudent) => Promise<{
        data: UserPerson[];
        total: number;
    }>;
}
