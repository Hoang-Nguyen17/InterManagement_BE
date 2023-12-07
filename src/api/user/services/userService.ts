import { UserAccount } from "../../../database/entities/UserAccount";
import { AppDataSource } from "../../../ormconfig";
import { Repository } from "typeorm";
import { hashPass } from "../../../common/helpers/common"
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";

export class UserService {
    private userAccountRepository = AppDataSource.getRepository(UserAccount);
    private userPersonRepository = AppDataSource.getRepository(UserPerson);
    private teacherRepository = AppDataSource.getRepository(Teacher);
    private studentRepository = AppDataSource.getRepository(Student);
    private businessRepository = AppDataSource.getRepository(Business);

    public login = async (username: string, pass: string) => {
        try {
            const result = await this.userAccountRepository.findOne({
                where: {
                    username: username,
                    pass: hashPass(pass),
                },
                relations: ['permission', 'user_person', 'user_person.teacher', 'user_person.student', 'user_person.business', 'user_person.administrator'],
            });
            const user = result?.user_person;
            let schoolId = user?.administrator?.school_id ?? null;
            if (user?.student) {
                const student = await this.studentRepository.findOne({ where: { id: user.student.id }, relations: ['program'] });
                schoolId = student.program.school_id;
            } else if (user?.teacher) {
                const teacher = await this.teacherRepository.findOne({ where: { id: user.teacher.id }, relations: ['department'] });
                schoolId = teacher.department.school_id;
            }

            return { result, schoolId };
        } catch (e) {
            throw e;
        }
    }

    public getProfileById = async (id: number) => {
        const data = await this.userPersonRepository.findOne({ where: { id: id }, relations: ['teacher', 'administrator', 'business', 'student'] })
        return data;
    }

    public isExistsEmail = async (email: string) => {
        try {
            const data = await this.userPersonRepository
                .findOne({
                    where: {
                        email: email,
                    }
                });
            return data?.email;
        } catch (e) {
            throw e;
        }
    }

    public saveUser = async (userAccount: UserAccount, userPerson: UserPerson) => {
        try {
            const user_account = await this.userAccountRepository.save(userAccount);
            user_account.user_person = await this.userPersonRepository.save(userPerson);
            return user_account;
        } catch (e) {
            throw e;
        }
    }

    public saveTeacher = async (teacher: Teacher): Promise<Teacher> => {
        try {
            return await this.teacherRepository.save(teacher);
        } catch (e) {
            throw e;
        }
    }

    public saveStudent = async (student: Student): Promise<Student> => {
        try {
            return await this.studentRepository.save(student);
        } catch (e) {
            throw e;
        }
    }

    public saveBusiness = async (business: Business): Promise<Business> => {
        try {
            return await this.businessRepository.save(business);
        } catch (e) {
            throw e;
        }
    }
}
