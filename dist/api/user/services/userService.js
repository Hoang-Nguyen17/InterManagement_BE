"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserAccount_1 = require("../../../database/entities/UserAccount");
const ormconfig_1 = require("../../../ormconfig");
const common_1 = require("../../../common/helpers/common");
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
        this.login = async (username, pass) => {
            try {
                const result = await this.userAccountRepository.findOne({
                    where: {
                        username: username,
                        pass: (0, common_1.hashPass)(pass),
                    },
                    relations: ['permission', 'user_person', 'user_person.teacher', 'user_person.student', 'user_person.business', 'user_person.administrator'],
                });
                const user = result?.user_person;
                let schoolId = user?.administrator?.school_id ?? null;
                if (user?.student) {
                    const student = await this.studentRepository.findOne({ where: { id: user.student.id }, relations: ['program'] });
                    schoolId = student.program.school_id;
                }
                else if (user?.teacher) {
                    const teacher = await this.teacherRepository.findOne({ where: { id: user.teacher.id }, relations: ['department'] });
                    schoolId = teacher.department.school_id;
                }
                return { result, schoolId };
            }
            catch (e) {
                throw e;
            }
        };
        this.getProfileById = async (id) => {
            const data = await this.userPersonRepository.findOne({ where: { id: id }, relations: ['teacher', 'administrator', 'business', 'student'] });
            return data;
        };
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
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map