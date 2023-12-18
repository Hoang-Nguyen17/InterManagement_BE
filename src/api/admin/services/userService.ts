import { UserAccount } from "../../../database/entities/UserAccount";
import { AppDataSource } from "../../../ormconfig";
import { hashPass } from "../../../common/helpers/common"
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";
import { Brackets, DeepPartial, FindOneOptions } from "typeorm";
import { IFilterTeacher } from "../interfaces/teacher.interface";
import { IFilterStudent } from "../interfaces/student.interface";
import { SchoolService } from "./schoolService";

export class UserService {
    private userAccountRepository = AppDataSource.getRepository(UserAccount);
    private userPersonRepository = AppDataSource.getRepository(UserPerson);
    private teacherRepository = AppDataSource.getRepository(Teacher);
    private studentRepository = AppDataSource.getRepository(Student);
    private businessRepository = AppDataSource.getRepository(Business);
    private schoolAdminService = new SchoolService()


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

    public saveAccount = async (userAccount: UserAccount) => {
        try {
            return await this.userAccountRepository.save(userAccount);
        } catch (error) {
            throw error;
        }
    }

    createUserAccount(data: DeepPartial<UserAccount>) {
        return this.userAccountRepository.create(data);
    }

    public saveUserPerson = async (userPerson: UserPerson) => {
        try {
            return await this.userPersonRepository.save(userPerson);
        } catch (e) {
            throw e;
        }
    }

    createUserPerson(data: DeepPartial<UserPerson>) {
        return this.userPersonRepository.create(data);
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

    public getOneAccount = async (filter?: FindOneOptions<UserAccount>) => {
        return await this.userAccountRepository.findOne(filter);
    }

    // Teacher
    public getOneTeacher = async (filter?: FindOneOptions<Teacher>) => {
        return await this.teacherRepository.findOne(filter);
    }

    public getOneUser = async (filter?: FindOneOptions<UserPerson>) => {
        return await this.userPersonRepository.findOne(filter);
    }

    public getOneStudent = async (filter?: FindOneOptions<Student>) => {
        return await this.studentRepository.findOne(filter);
    }

    public isValidAccount = async (account: UserAccount, schoolId: number): Promise<boolean> => {
        let isValid;

        isValid = await this.userAccountRepository.findOne({ where: { username: account.username } });
        if (isValid) return false;

        isValid = await this.isExistsEmail(account.user_person.email);
        if (isValid) return false;

        if (account.user_person.teacher) {
            isValid = this.schoolAdminService.getOneDepartment({ where: { school_id: schoolId, id: account.user_person.teacher.department_id } });
            if (!isValid) return false;
        } else if (account.user_person.student) {
            if (!(
                await this.schoolAdminService.getOneProgram({ where: { school_id: schoolId, id: account.user_person.student.program_id } })
                && await this.schoolAdminService.checkMajorBySchoolId(schoolId, account.user_person.student.major_id)
                && await this.schoolAdminService.checkClassBySchoolId(schoolId, account.user_person.student.class_id)
            )) return false
        }
        return true;
    }

    public getAdministrator = async (schoolId: number) => {
        const qb = this.userPersonRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.administrator', 'administrator')
            .where('administrator.school_id = :schoolId', { schoolId });

        const data = await qb.getMany();
        return data;
    }

    public getTeachers = async (filter: IFilterTeacher) => {
        const { schoolId, limit, page, departmentId, searchText, status } = filter;
        const qb = this.userPersonRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.teacher', 'teacher')
            .leftJoin('teacher.department', 'department')
            .addSelect(['department.department_name']);

        if (status) qb.andWhere('teacher.current_status = :status', { status });
        if (schoolId) qb.andWhere('department.school_id = :schoolId', { schoolId });
        if (departmentId) qb.andWhere('department.id = :departmentId', { departmentId });
        if (searchText) qb.andWhere(new Brackets((qb) => {
            qb
                .orWhere('user.email ILIKE :searchText', { searchText })
                .orWhere('user.full_name ILIKE :searchtext', { searchText })
        }));

        qb.offset((page - 1) * limit)
            .take(limit).orderBy('user.createdAt', 'DESC');

        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }

    public getStudents = async (filter: IFilterStudent) => {
        const { schoolId, limit, page, departmentId, classId, searchText, status } = filter;
        const qb = this.userPersonRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.student', 'student')
            .leftJoin('student.class', 'Class')
            .leftJoin('Class.department', 'department')
            .addSelect(['department.id', 'department.department_name', 'Class.class_name', 'Class.id']);

        if (status) qb.andWhere('student.current_status = :status', { status });
        if (schoolId) qb.andWhere('department.school_id = :schoolId', { schoolId });
        if (departmentId) qb.andWhere('department.id = :departmentId', { departmentId });
        if (classId) qb.andWhere('class.id = :classId', { classId });
        if (searchText) qb.andWhere(new Brackets((qb) => {
            qb
                .orWhere('user.email ILIKE :searchText', { searchText })
                .orWhere('user.full_name ILIKE :searchtext', { searchText })
        }));

        qb.offset((page - 1) * limit)
            .take(limit).orderBy('user.createdAt', 'DESC');

        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }
}
