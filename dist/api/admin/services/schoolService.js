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
const typeorm_1 = require("typeorm");
const Major_1 = require("../../../database/entities/Major");
const Student_1 = require("../../../database/entities/Student");
const AcademicYear_1 = require("../../../database/entities/AcademicYear");
const Semester_1 = require("../../../database/entities/Semester");
class SchoolService {
    constructor() {
        this.schoolRepository = ormconfig_1.AppDataSource.getRepository(School_1.School);
        this.programRepository = ormconfig_1.AppDataSource.getRepository(Program_1.Program);
        this.departmentRepository = ormconfig_1.AppDataSource.getRepository(Department_1.Department);
        this.majorRepository = ormconfig_1.AppDataSource.getRepository(Major_1.Major);
        this.classRepository = ormconfig_1.AppDataSource.getRepository(Class_1.Class);
        this.internSubjectRespository = ormconfig_1.AppDataSource.getRepository(InternSubject_1.InternSubject);
        this.academicYearRes = ormconfig_1.AppDataSource.getRepository(AcademicYear_1.AcademicYear);
        this.semesterRes = ormconfig_1.AppDataSource.getRepository(Semester_1.Semester);
        this.getSchool = async (schoolId) => {
            try {
                const school = this.schoolRepository
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
        this.getOneSchool = async (filter) => {
            return await this.schoolRepository.findOne(filter);
        };
        this.getOneDepartment = async (filter) => {
            return await this.departmentRepository.findOne(filter);
        };
        this.getOneProgram = async (filter) => {
            return await this.programRepository.findOne(filter);
        };
        this.getOneClass = async (filter) => {
            return await this.classRepository.findOne(filter);
        };
        this.getOneMajor = async (filter) => {
            return await this.majorRepository.findOne(filter);
        };
        this.getOneInternSubject = async (filter) => {
            return await this.internSubjectRespository.findOne(filter);
        };
        this.checkMajorBySchoolId = async (schoolId, majorId) => {
            return await this.majorRepository
                .createQueryBuilder('major')
                .leftJoin('major.department', 'department')
                .where('major.id = :majorId', { majorId })
                .andWhere('department.school_id = :schoolId', { schoolId })
                .getOne();
        };
        this.checkClassBySchoolId = async (schoolId, classId) => {
            return await this.classRepository
                .createQueryBuilder('Class')
                .leftJoin('Class.department', 'department')
                .where('Class.id = :classId', { classId })
                .andWhere('department.school_id = :schoolId', { schoolId })
                .getOne();
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
                    },
                    relations: ['teacher', 'teacher.user_person'],
                });
                return data;
            }
            catch (e) {
                throw e;
            }
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
                    .leftJoinAndSelect('teacher.user_person', 'teacherPerson')
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
        this.getOneAcademicYear = async (filter) => {
            return await this.academicYearRes.findOne(filter);
        };
        this.getOneSemester = async (filter) => {
            return await this.academicYearRes.findOne(filter);
        };
    }
    createMajor(data) {
        return this.majorRepository.create(data);
    }
    async saveMajor(data) {
        return await this.majorRepository.save(data);
    }
    async getAllMajor(filter) {
        return await this.majorRepository.find(filter);
    }
    async softDeleteMajor(ids) {
        return await this.majorRepository.softDelete({ id: (0, typeorm_1.In)(ids) });
    }
    async majors(filter) {
        const { page, limit, search_text, department_id, schoolId } = filter;
        const qb = await this.majorRepository
            .createQueryBuilder('major')
            .leftJoinAndSelect('major.department', 'department')
            .where('department.school_id = :schoolId', { schoolId: schoolId });
        if (search_text) {
            qb.andWhere(new typeorm_1.Brackets((qb) => {
                qb.orWhere('major.major_name LIKE :search_text');
            })).setParameter(search_text, `%${search_text}%`);
        }
        if (department_id) {
            qb.andWhere('department.id = :departmentId', { departmentId: department_id });
        }
        const [items, total] = await qb.offset((page - 1) * limit).take(limit).getManyAndCount();
        return { items, total };
    }
    createAcademicYear(data) {
        return this.academicYearRes.create(data);
    }
    async saveAcademicYear(data) {
        return await this.academicYearRes.save(data);
    }
    async getAllAcademicYear(filter) {
        return await this.academicYearRes.find(filter);
    }
    async softDeleteAcademicYear(ids) {
        return await this.academicYearRes.softDelete({ id: (0, typeorm_1.In)(ids) });
    }
    async academicYears(filter) {
        const { page, limit, schoolId } = filter;
        const qb = await this.academicYearRes
            .createQueryBuilder('academicYear')
            .where('academicYear.school_id = :schoolId', { schoolId: schoolId });
        const [items, total] = await qb.offset((page - 1) * limit).take(limit).orderBy('academicYear.current_year', 'DESC').getManyAndCount();
        return { items, total };
    }
    createSemester(data) {
        return this.semesterRes.create(data);
    }
    async saveSemester(data) {
        return await this.semesterRes.save(data);
    }
    async getAllSemester(filter) {
        return await this.semesterRes.find(filter);
    }
    async softDeleteSemester(ids) {
        return await this.semesterRes.softDelete({ id: (0, typeorm_1.In)(ids) });
    }
}
exports.SchoolService = SchoolService;
//# sourceMappingURL=schoolService.js.map