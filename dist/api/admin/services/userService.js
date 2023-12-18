"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserAccount_1 = require("../../../database/entities/UserAccount");
const ormconfig_1 = require("../../../ormconfig");
const UserPerson_1 = require("../../../database/entities/UserPerson");
const Teacher_1 = require("../../../database/entities/Teacher");
const Student_1 = require("../../../database/entities/Student");
const Business_1 = require("../../../database/entities/Business");
class UserService {
    constructor() {
        this.userAccountRepository = ormconfig_1.AppDataSource.getRepository(UserAccount_1.UserAccount);
        this.userPersonRepository = ormconfig_1.AppDataSource.getRepository(UserPerson_1.UserPerson);
        this.teacherRepository = ormconfig_1.AppDataSource.getRepository(Teacher_1.Teacher);
        this.studentRepository = ormconfig_1.AppDataSource.getRepository(Student_1.Student);
        this.businessRepository = ormconfig_1.AppDataSource.getRepository(Business_1.Business);
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
        this.saveUser = async (userAccount, userPerson) => {
            try {
                const user_account = await this.userAccountRepository.save(userAccount);
                user_account.user_person = await this.userPersonRepository.save(userPerson);
                return user_account;
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
        this.getOneTeacher = async (filter) => {
            return await this.teacherRepository.findOne(filter);
        };
        this.getOneUser = async (filter) => {
            return await this.userPersonRepository.findOne(filter);
        };
        this.getOneStudent = async (filter) => {
            return await this.studentRepository.findOne(filter);
        };
        this.getAdministrator = async (schoolId) => {
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.administrator', 'administrator')
                .where('administrator.school_id = :schoolId', { schoolId });
            const data = await qb.getMany();
            return data;
        };
        this.getTeachers = async (schoolId, page, limit) => {
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.teacher', 'teacher')
                .leftJoin('teacher.department', 'department')
                .where('department.school_id = :schoolId', { schoolId })
                .andWhere('user.teacher IS NOT NULL')
                .offset((page - 1) * limit)
                .take(limit).orderBy('user.createdAt', 'DESC');
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        };
        this.getStudents = async (schoolId, page, limit) => {
            const qb = this.userPersonRepository
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.student', 'student')
                .leftJoinAndSelect('student.class', 'Class')
                .leftJoin('Class.department', 'department')
                .where('department.school_id = :schoolId', { schoolId })
                .andWhere('user.student IS NOT NULL')
                .offset((page - 1) * limit)
                .take(limit).orderBy('user.createdAt', 'DESC');
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map