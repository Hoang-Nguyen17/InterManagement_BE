import { Department } from "../../../database/entities/Department";
import { Program } from "../../../database/entities/Program";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "../../../ormconfig";
import { Class } from "../../../database/entities/Class";
import { InternSubject } from "../../../database/entities/InternSubject";
import { Teacher } from "../../../database/entities/Teacher";
import { UserService } from "./userService";
import { Brackets, FindOneOptions, DeepPartial, In } from "typeorm";
import { SchoolService as UserSchoolService } from "../../user/services/schoolService";
import { FilterClass } from "../interfaces/class.interface";
import { Major } from "../../../database/entities/Major";
import { Student } from "../../../database/entities/Student";
import { FilterMajor } from "../interfaces/major.interface";
import { AcademicYear } from "../../../database/entities/AcademicYear";
import { FilterAcademicYear } from "../interfaces/academic-year.interface";
import { Semester } from "../../../database/entities/Semester";


export class SchoolService {
    private schoolRepository = AppDataSource.getRepository(School);
    private programRepository = AppDataSource.getRepository(Program);
    private departmentRepository = AppDataSource.getRepository(Department);
    private majorRepository = AppDataSource.getRepository(Major);
    private classRepository = AppDataSource.getRepository(Class);
    private internSubjectRespository = AppDataSource.getRepository(InternSubject);
    private academicYearRes = AppDataSource.getRepository(AcademicYear);
    private semesterRes = AppDataSource.getRepository(Semester);

    public getSchool = async (schoolId: number): Promise<School> => {
        try {
            const school = this.schoolRepository
                .createQueryBuilder('school')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countDepartment')
                        .from(Department, 'd')
                        .where('d.school_id = school.id');
                }, 'countDepartment')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countProgram')
                        .from(Program, 'p')
                        .where('p.school_id = school.id');
                }, 'countProgram')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countMajor')
                        .from(Major, 'm')
                        .leftJoin(Department, 'd', 'm.department_id = d.id')
                        .where('d.school_id = school.id')
                }, 'countMajor')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countClass')
                        .from(Class, 'c')
                        .leftJoin(Department, 'd', 'c.department_id = d.id')
                        .where('d.school_id = school.id')
                }, 'countClass')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countTeacher')
                        .from(Teacher, 't')
                        .leftJoin(Department, 'd', 't.department_id = d.id')
                        .where('d.school_id = school.id')
                }, 'countTeacher')
                .addSelect((subQuery) => {
                    return subQuery
                        .select('COUNT(*)', 'countStudent')
                        .from(Student, 's')
                        .leftJoin(Class, 'c', 's.class_id = c.id')
                        .leftJoin(Department, 'd', 'c.department_id = d.id')
                        .where('d.school_id = school.id')
                }, 'countStudent')
                .where('school.id = :schoolId', { schoolId })
                .getRawOne();
            return school;
        } catch (e) {
            throw e;
        }
    }

    public getOneSchool = async (filter?: FindOneOptions<School>) => {
        return await this.schoolRepository.findOne(filter);
    }

    public getOneDepartment = async (filter?: FindOneOptions<Department>) => {
        return await this.departmentRepository.findOne(filter);
    }

    public getOneProgram = async (filter?: FindOneOptions<Program>) => {
        return await this.programRepository.findOne(filter);
    }

    public getOneClass = async (filter?: FindOneOptions<Class>) => {
        return await this.classRepository.findOne(filter);
    }

    public getOneMajor = async (filter?: FindOneOptions<Major>) => {
        return await this.majorRepository.findOne(filter);
    }

    public getOneInternSubject = async (filter?: FindOneOptions<InternSubject>) => {
        return await this.internSubjectRespository.findOne(filter);
    }

    public checkMajorBySchoolId = async (schoolId: number, majorId: number) => {
        return await this.majorRepository
            .createQueryBuilder('major')
            .leftJoin('major.department', 'department')
            .where('major.id = :majorId', { majorId })
            .andWhere('department.school_id = :schoolId', { schoolId })
            .getOne();
    }

    public checkClassBySchoolId = async (schoolId: number, classId: number) => {
        return await this.classRepository
            .createQueryBuilder('Class')
            .leftJoin('Class.department', 'department')
            .where('Class.id = :classId', { classId })
            .andWhere('department.school_id = :schoolId', { schoolId })
            .getOne();
    }

    public getPrograms = async (schoolId: number): Promise<Program[]> => {
        try {
            const data = this.programRepository.find({
                where: {
                    school_id: schoolId,
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    public getProgram = async (schoolId: number, programId: number): Promise<Program> => {
        try {
            const data = this.programRepository.findOne({
                where: {
                    school_id: schoolId,
                    id: programId,
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    public saveProgram = async (program: Program): Promise<Program> => {
        try {
            if (program.id) {
                const oldData = await this.programRepository.findOne({
                    where: {
                        id: program.id,
                    }
                })
                if (!oldData) return;
                program.program_name = program.program_name ?? oldData.program_name;
                // program.school_id = program.school_id ?? oldData.school_id;
            }
            const result = this.programRepository.save(program)
            return result;
        } catch (e) {
            throw e;
        }
    }

    public deleteProgram = async (schoolId: number, programId: number): Promise<Boolean> => {
        try {
            const program = await this.programRepository.findOne({
                where: {
                    id: programId,
                }
            })
            if (!program) return false;
            await this.programRepository.softRemove(program)
            return true;
        } catch (e) {
            throw e;
        }
    }

    // department
    public getDepartments = async (schoolId: number): Promise<Department[]> => {
        try {
            const data = this.departmentRepository.find({
                where: {
                    school_id: schoolId,
                },
                relations: ['teacher', 'teacher.user_person'],
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    public getDepartment = async (schoolId: number, departmentId: number): Promise<Department> => {
        try {
            const data = this.departmentRepository.findOne({
                where: {
                    school_id: schoolId,
                    id: departmentId,
                }
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    public saveDepartment = async (department: Department): Promise<Department> => {
        try {
            if (department.id) {
                const oldData = await this.departmentRepository.findOne({
                    where: {
                        id: department.id,
                    }
                })
                if (!oldData) return;
                department.department_name = department.department_name ?? oldData.department_name;
                department.department_head = department.department_head ?? oldData.department_head;
            }
            const result = this.departmentRepository.save(department)
            return result;
        } catch (e) {
            throw e;
        }
    }

    public deleteDepartment = async (schoolId: number, departmentId: number): Promise<Boolean> => {
        try {
            const department = await this.departmentRepository.findOne({
                where: {
                    id: departmentId,
                    school_id: schoolId,
                }
            })
            if (!department) return false;
            await this.departmentRepository.softRemove(department)
            return true;
        } catch (e) {
            throw e;
        }
    }

    public saveClass = async (Class: Class): Promise<Class> => {
        try {
            if (Class.id) {
                const oldData = await this.classRepository.findOne({
                    where: {
                        id: Class.id,
                    }
                })
                if (!oldData) return;
                Class.class_name = Class.class_name ?? oldData.class_name;
                Class.academic_year = Class.academic_year ?? oldData.academic_year;
                Class.department_id = Class.department_id ?? oldData.department_id;
                Class.head_teacher = Class.head_teacher ?? oldData.head_teacher;
                Class.students = Class.students ?? oldData.students;
            }
            const result = await this.classRepository.save(Class);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public deletClass = async (classId: number): Promise<boolean> => {
        try {
            const result = await this.classRepository.softDelete({ id: classId })
            if (!result.affected) return false;
            return true;
        } catch (e) {
            throw e;
        }
    }

    public getClasses = async (filter: FilterClass) => {
        try {
            const { academic_year, head_teacher, department_id, search_text, school_id, page, limit } = filter;
            const qb = this.classRepository
                .createQueryBuilder("class")
                .innerJoinAndSelect('class.department', 'department')
                .leftJoinAndSelect('class.teacher', 'teacher')
                .leftJoinAndSelect('teacher.user_person', 'teacherPerson')
                .where('department.school_id = :schoolId', { schoolId: school_id });

            if (department_id) qb.andWhere('class.department_id = :department_id', { department_id });
            if (academic_year) qb.andWhere('class.academic_year = :academic_year', { academic_year });
            if (head_teacher) qb.andWhere('class.head_teacher = :head_teacher', { head_teacher });
            if (search_text) qb.andWhere(new Brackets((qb) => {
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
        } catch (e) {
            throw e;
        }
    }

    createMajor(data: DeepPartial<Major>) {
        return this.majorRepository.create(data);
    }

    async saveMajor(data: DeepPartial<Major>): Promise<Major> {
        return await this.majorRepository.save(data);
    }

    async getAllMajor(filter?: FindOneOptions<Major>) {
        return await this.majorRepository.find(filter);
    }

    async softDeleteMajor(ids: number[]) {
        return await this.majorRepository.softDelete({ id: In(ids) });
    }

    async majors(filter: FilterMajor): Promise<{ items: Major[], total: number }> {
        const { page, limit, search_text, department_id, schoolId } = filter;
        const qb = await this.majorRepository
            .createQueryBuilder('major')
            .leftJoinAndSelect('major.department', 'department')
            .where('department.school_id = :schoolId', { schoolId: schoolId });

        if (search_text) {
            qb.andWhere(new Brackets((qb) => {
                qb.orWhere('major.major_name LIKE :search_text')
            })).setParameter(search_text, `%${search_text}%`);
        }

        if (department_id) {
            qb.andWhere('department.id = :departmentId', { departmentId: department_id });
        }

        const [items, total] = await qb.offset((page - 1) * limit).take(limit).getManyAndCount();
        return { items, total };
    }


    // ---------------------AcademicYear----------------------------------------
    createAcademicYear(data: DeepPartial<AcademicYear>) {
        return this.academicYearRes.create(data);
    }

    async saveAcademicYear(data: DeepPartial<AcademicYear>): Promise<AcademicYear> {
        return await this.academicYearRes.save(data);
    }

    async getAllAcademicYear(filter?: FindOneOptions<AcademicYear>) {
        return await this.academicYearRes.find(filter);
    }

    async softDeleteAcademicYear(ids: number[]) {
        return await this.academicYearRes.softDelete({ id: In(ids) });
    }

    public getOneAcademicYear = async (filter?: FindOneOptions<AcademicYear>) => {
        return await this.academicYearRes.findOne(filter);
    }

    async academicYears(filter: FilterAcademicYear): Promise<{ items: AcademicYear[], total: number }> {
        const { page, limit, schoolId } = filter;
        const qb = await this.academicYearRes
            .createQueryBuilder('academicYear')
            .where('academicYear.school_id = :schoolId', { schoolId: schoolId });

        const [items, total] = await qb.offset((page - 1) * limit).take(limit).orderBy('academicYear.current_year', 'DESC').getManyAndCount();
        return { items, total };
    }

    // ---------------------Semester----------------------------------------
    createSemester(data: DeepPartial<Semester>) {
        return this.semesterRes.create(data);
    }

    async saveSemester(data: DeepPartial<Semester>): Promise<Semester> {
        return await this.semesterRes.save(data);
    }

    public getOneSemester = async (filter?: FindOneOptions<AcademicYear>) => {
        return await this.academicYearRes.findOne(filter);
    }

    async getAllSemester(filter?: FindOneOptions<Semester>) {
        return await this.semesterRes.find(filter);
    }

    async softDeleteSemester(ids: number[]) {
        return await this.semesterRes.softDelete({ id: In(ids) });
    }
}