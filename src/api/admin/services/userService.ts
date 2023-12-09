import { UserAccount } from "../../../database/entities/UserAccount";
import { AppDataSource } from "../../../ormconfig";
import { hashPass } from "../../../common/helpers/common"
import { UserPerson } from "../../../database/entities/UserPerson";
import { Teacher } from "../../../database/entities/Teacher";
import { Student } from "../../../database/entities/Student";
import { Business } from "../../../database/entities/Business";
import { Brackets, FindOneOptions } from "typeorm";
import { IFilterTeacher } from "../interfaces/teacher.interface";
import { IFilterStudent } from "../interfaces/student.interface";

export class UserService {
    private userAccountRepository = AppDataSource.getRepository(UserAccount);
    private userPersonRepository = AppDataSource.getRepository(UserPerson);
    private teacherRepository = AppDataSource.getRepository(Teacher);
    private studentRepository = AppDataSource.getRepository(Student);
    private businessRepository = AppDataSource.getRepository(Business);


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

        if (status) qb.andWhere('teacher.current_status = status', { status });
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
            .innerJoin('user.student', 'student')
            .leftJoin('student.class', 'Class')
            .leftJoin('Class.department', 'department')
            .addSelect(['department.department_name', 'Class.class_name']);
            
        if (status) qb.andWhere('student.current_status = status', { status });
        if (schoolId) qb.andWhere('department.school_id = schoolId', { schoolId });
        if (departmentId) qb.andWhere('department.id = departmentId', { departmentId });
        if (classId) qb.andWhere('class.id = classId', { classId });
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
