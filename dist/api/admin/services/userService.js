"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserAccount_1 = require("../../../database/entities/UserAccount");
const ormconfig_1 = require("../../../ormconfig");
const UserPerson_1 = require("../../../database/entities/UserPerson");
const Teacher_1 = require("../../../database/entities/Teacher");
const Student_1 = require("../../../database/entities/Student");
const Business_1 = require("../../../database/entities/Business");
const typeorm_1 = require("typeorm");
const schoolService_1 = require("./schoolService");
class UserService {
    constructor() {
        this.userAccountRepository = ormconfig_1.AppDataSource.getRepository(UserAccount_1.UserAccount);
        this.userPersonRepository = ormconfig_1.AppDataSource.getRepository(UserPerson_1.UserPerson);
        this.teacherRepository = ormconfig_1.AppDataSource.getRepository(Teacher_1.Teacher);
        this.studentRepository = ormconfig_1.AppDataSource.getRepository(Student_1.Student);
        this.businessRepository = ormconfig_1.AppDataSource.getRepository(Business_1.Business);
        this.schoolAdminService = new schoolService_1.SchoolService();
        this.isExistsEmail = async (email) => {
            try {
                const data = await this.userPersonRepository
                    .findOne({
                    where: {
                        email: email,
                    }
                });
                return data?.email;
            }
            catch (e) {
                throw e;
            }
        };
        this.saveAccount = async (userAccount) => {
            try {
                return await this.userAccountRepository.save(userAccount);
            }
            catch (error) {
                throw error;
            }
        };
        this.saveUserPerson = async (userPerson) => {
            try {
                return await this.userPersonRepository.save(userPerson);
            }
            catch (e) {
                throw e;
            }
        };
        this.saveTeacher = async (teacher) => {
            try {
                return await this.teacherRepository.save(teacher);
            }
            catch (e) {
                throw e;
            }
        };
        this.saveStudent = async (student) => {
            try {
                return await this.studentRepository.save(student);
            }
            catch (e) {
                throw e;
            }
        };
        this.saveBusiness = async (business) => {
            try {
                return await this.businessRepository.save(business);
            }
            catch (e) {
                throw e;
            }
        };
        this.getOneAccount = async (filter) => {
            return await this.userAccountRepository.findOne(filter);
        };
        this.getOneTeacher = async (filter) => {
            return await this.teacherRepository.findOne(filter);
        };
        this.getOneUser = async (filter) => {
            return await this.userPersonRepository.findOne(filter);
        };
        this.getOneStudent = async (filter) => {
            return await this.studentRepository.findOne(filter);
        };
        this.isValidAccount = async (account, schoolId) => {
            let isValid;
            isValid = await this.userAccountRepository.findOne({ where: { username: account.username } });
            if (isValid)
                return false;
            isValid = await this.isExistsEmail(account.user_person.email);
            if (isValid)
                return false;
            if (account.user_person.teacher) {
                isValid = this.schoolAdminService.getOneDepartment({ where: { school_id: schoolId, id: account.user_person.teacher.department_id } });
                if (!isValid)
                    return false;
            }
            else if (account.user_person.student) {
                if (!(await this.schoolAdminService.getOneProgram({ where: { school_id: schoolId, id: account.user_person.student.program_id } })
                    && await this.schoolAdminService.checkMajorBySchoolId(schoolId, account.user_person.student.major_id)
                    && await this.schoolAdminService.checkClassBySchoolId(schoolId, account.user_person.student.class_id)))
                    return false;
            }
            return true;
        };
        this.getAdministrator = async (schoolId) => {
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.administrator', 'administrator')
                .where('administrator.school_id = :schoolId', { schoolId });
            const data = await qb.getMany();
            return data;
        };
        this.getTeachers = async (filter) => {
            const { schoolId, limit, page, departmentId, searchText, status } = filter;
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .innerJoinAndSelect('user.teacher', 'teacher')
                .leftJoin('teacher.department', 'department')
                .addSelect(['department.department_name']);
            if (status)
                qb.andWhere('teacher.current_status = :status', { status });
            if (schoolId)
                qb.andWhere('department.school_id = :schoolId', { schoolId });
            if (departmentId)
                qb.andWhere('department.id = :departmentId', { departmentId });
            if (searchText)
                qb.andWhere(new typeorm_1.Brackets((qb) => {
                    qb
                        .orWhere('user.email ILIKE :searchText', { searchText })
                        .orWhere('user.full_name ILIKE :searchtext', { searchText });
                }));
            qb.offset((page - 1) * limit)
                .take(limit).orderBy('user.createdAt', 'DESC');
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        };
        this.getStudents = async (filter) => {
            const { schoolId, limit, page, departmentId, classId, searchText, status } = filter;
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .innerJoinAndSelect('user.student', 'student')
                .leftJoin('student.class', 'Class')
                .leftJoin('Class.department', 'department')
                .addSelect(['department.id', 'department.department_name', 'Class.class_name', 'Class.id']);
            if (status)
                qb.andWhere('student.current_status = :status', { status });
            if (schoolId)
                qb.andWhere('department.school_id = :schoolId', { schoolId });
            if (departmentId)
                qb.andWhere('department.id = :departmentId', { departmentId });
            if (classId)
                qb.andWhere('class.id = :classId', { classId });
            if (searchText)
                qb.andWhere(new typeorm_1.Brackets((qb) => {
                    qb
                        .orWhere('user.email ILIKE :searchText', { searchText })
                        .orWhere('user.full_name ILIKE :searchtext', { searchText });
                }));
            qb.offset((page - 1) * limit)
                .take(limit).orderBy('user.createdAt', 'DESC');
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        };
    }
    createUserAccount(data) {
        return this.userAccountRepository.create(data);
    }
    createUserPerson(data) {
        return this.userPersonRepository.create(data);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map