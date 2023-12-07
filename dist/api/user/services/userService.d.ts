import { UserAccount } from "../../../database/entities/UserAccount";
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";
export declare class UserService {
    private userAccountRepository;
    private userPersonRepository;
    private teacherRepository;
    private studentRepository;
    private businessRepository;
    login: (username: string, pass: string) => Promise<{
        result: UserAccount;
        schoolId: number;
    }>;
    getProfileById: (id: number) => Promise<UserPerson>;
    isExistsEmail: (email: string) => Promise<string>;
    saveUser: (userAccount: UserAccount, userPerson: UserPerson) => Promise<UserAccount>;
    saveTeacher: (teacher: Teacher) => Promise<Teacher>;
    saveStudent: (student: Student) => Promise<Student>;
    saveBusiness: (business: Business) => Promise<Business>;
}
