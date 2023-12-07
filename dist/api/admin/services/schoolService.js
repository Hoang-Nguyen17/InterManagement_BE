"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const Department_1 = require("../../../database/entities/Department");
const Program_1 = require("../../../database/entities/Program");
const School_1 = require("../../../database/entities/School");
const ormconfig_1 = require("../../../ormconfig");
const Class_1 = require("../../../database/entities/Class");
const InternSubject_1 = require("../../../database/entities/InternSubject");
const Teacher_1 = require("../../../database/entities/Teacher");
const userService_1 = require("./userService");
const typeorm_1 = require("typeorm");
const schoolService_1 = require("../../user/services/schoolService");
const Major_1 = require("../../../database/entities/Major");
const Student_1 = require("../../../database/entities/Student");
class SchoolService {
    constructor() {
        this.shcoolRepository = ormconfig_1.AppDataSource.getRepository(School_1.School);
        this.programRepository = ormconfig_1.AppDataSource.getRepository(Program_1.Program);
        this.departmentRepository = ormconfig_1.AppDataSource.getRepository(Department_1.Department);
        this.classRepository = ormconfig_1.AppDataSource.getRepository(Class_1.Class);
        this.internSubjectRespository = ormconfig_1.AppDataSource.getRepository(InternSubject_1.InternSubject);
        this.userService = new userService_1.UserService();
        this.userSchoolService = new schoolService_1.SchoolService();
        this.getSchool = async (schoolId) => {
            try {
                const school = this.shcoolRepository
                    .createQueryBuilder('school')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countDepartment')
                        .from(Department_1.Department, 'd')
                        .where('d.school_id = school.id');
                }, 'countDepartment')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countProgram')
                        .from(Program_1.Program, 'p')
                        .where('p.school_id = school.id');
                }, 'countProgram')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countMajor')
                        .from(Major_1.Major, 'm')
                        .leftJoin(Department_1.Department, 'd', 'm.department_id = d.id')
                        .where('d.school_id = school.id');
                }, 'countMajor')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countClass')
                        .from(Class_1.Class, 'c')
                        .leftJoin(Department_1.Department, 'd', 'c.department_id = d.id')
                        .where('d.school_id = school.id');
                }, 'countClass')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countTeacher')
                        .from(Teacher_1.Teacher, 't')
                        .leftJoin(Department_1.Department, 'd', 't.department_id = d.id')
                        .where('d.school_id = school.id');
                }, 'countTeacher')
                    .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countStudent')
                        .from(Student_1.Student, 's')
                        .leftJoin(Class_1.Class, 'c', 's.class_id = c.id')
                        .leftJoin(Department_1.Department, 'd', 'c.department_id = d.id')
                        .where('d.school_id = school.id');
                }, 'countStudent')
                    .where('school.id = :schoolId', { schoolId })
                    .getRawOne();
                return school;
            }
            catch (e) {
                throw e;
            }
        };
        this.getPrograms = async (schoolId) => {
            try {
                const data = this.programRepository.find({
                    where: {
                        school_id: schoolId,
                    }
                });
                return data;
            }
            catch (e) {
                throw e;
            }
        };
        this.getProgram = async (schoolId, programId) => {
            try {
                const data = this.programRepository.findOne({
                    where: {
                        school_id: schoolId,
                        id: programId,
                    }
                });
                return data;
            }
            catch (e) {
                throw e;
            }
        };
        this.saveProgram = async (program) => {
            try {
                if (program.id) {
                    const oldData = await this.programRepository.findOne({
                        where: {
                            id: program.id,
                        }
                    });
                    if (!oldData)
                        return;
                    program.program_name = program.program_name ?? oldData.program_name;
                }
                const result = this.programRepository.save(program);
                return result;
            }
            catch (e) {
                throw e;
            }
        };
        this.deleteProgram = async (schoolId, programId) => {
            try {
                const program = await this.programRepository.findOne({
                    where: {
                        id: programId,
                    }
                });
                if (!program)
                    return false;
                await this.programRepository.softRemove(program);
                return true;
            }
            catch (e) {
                throw e;
            }
        };
        this.getDepartments = async (schoolId) => {
            try {
                const data = this.departmentRepository.find({
                    where: {
                        school_id: schoolId,
                    }
                });
                return data;
            }
            catch (e) {
                throw e;
            }
        };
        this.getOneDepartment = async (filter) => {
            return await this.departmentRepository.findOne(filter);
        };
        this.getDepartment = async (schoolId, departmentId) => {
            try {
                const data = this.departmentRepository.findOne({
                    where: {
                        school_id: schoolId,
                        id: departmentId,
                    }
                });
                return data;
            }
            catch (e) {
                throw e;
            }
        };
        this.saveDepartment = async (department) => {
            try {
                if (department.id) {
                    const oldData = await this.departmentRepository.findOne({
                        where: {
                            id: department.id,
                        }
                    });
                    if (!oldData)
                        return;
                    department.department_name = department.department_name ?? oldData.department_name;
                    department.department_head = department.department_head ?? oldData.department_head;
                }
                const result = this.departmentRepository.save(department);
                return result;
            }
            catch (e) {
                throw e;
            }
        };
        this.deleteDepartment = async (schoolId, departmentId) => {
            try {
                const department = await this.departmentRepository.findOne({
                    where: {
                        id: departmentId,
                        school_id: schoolId,
                    }
                });
                if (!department)
                    return false;
                await this.departmentRepository.softRemove(department);
                return true;
            }
            catch (e) {
                throw e;
            }
        };
        this.saveClass = async (Class) => {
            try {
                if (Class.id) {
                    const oldData = await this.classRepository.findOne({
                        where: {
                            id: Class.id,
                        }
                    });
                    if (!oldData)
                        return;
                    Class.class_name = Class.class_name ?? oldData.class_name;
                    Class.academic_year = Class.academic_year ?? oldData.academic_year;
                    Class.department_id = Class.department_id ?? oldData.department_id;
                    Class.head_teacher = Class.head_teacher ?? oldData.head_teacher;
                    Class.students = Class.students ?? oldData.students;
                }
                const result = await this.classRepository.save(Class);
                return result;
            }
            catch (e) {
                throw e;
            }
        };
        this.deletClass = async (classId) => {
            try {
                const result = await this.classRepository.softDelete({ id: classId });
                if (!result.affected)
                    return false;
                return true;
            }
            catch (e) {
                throw e;
            }
        };
        this.getClasses = async (filter) => {
            try {
                const { academic_year, head_teacher, department_id, search_text, school_id, page, limit } = filter;
                const qb = this.classRepository
                    .createQueryBuilder("class")
                    .innerJoinAndSelect('class.department', 'department')
                    .leftJoinAndSelect('class.teacher', 'teacher')
                    .where('department.school_id = :schoolId', { schoolId: school_id });
                if (department_id)
                    qb.andWhere('class.department_id = :department_id', { department_id });
                if (academic_year)
                    qb.andWhere('class.academic_year = :academic_year', { academic_year });
                if (head_teacher)
                    qb.andWhere('class.head_teacher = :head_teacher', { head_teacher });
                if (search_text)
                    qb.andWhere(new typeorm_1.Brackets((qb) => {
                        qb.orWhere('class.class_name LIKE :search_text', {
                            search_text: `%${search_text}%`,
                        })
                            .orWhere('teacher.education_level LIKE :search_text', {
                            search_text: `%${search_text}%`,
                        });
                    }));
                console.log(filter);
                const [classes, total] = await qb.offset((page - 1) * limit).take(limit).orderBy('class.createdAt', 'DESC').getManyAndCount();
                return { data: classes, total: total };
            }
            catch (e) {
                throw e;
            }
        };
        this.getOneClass = async (filter) => {
            return await this.classRepository.findOne(filter);
        };
        this.getOneInternSubject = async (filter) => {
            return await this.internSubjectRespository.findOne(filter);
        };
    }
}
exports.SchoolService = SchoolService;
//# sourceMappingURL=schoolService.js.map