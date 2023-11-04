import { Department } from "../../../database/entities/Department";
import { Program } from "../../../database/entities/Program";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "../../../ormconfig";
import { Class } from "../../../database/entities/Class";


export class SchoolService {
    private shcoolRepository = AppDataSource.getRepository(School);
    private programRepository = AppDataSource.getRepository(Program);
    private departmentRepository = AppDataSource.getRepository(Department);
    private classRepository = AppDataSource.getRepository(Class);

    public getSchool = async (): Promise<School[]> => {
        try {
            const data = this.shcoolRepository.find({
                relations: ['program', 'department', 'department.major'],
            });
            return data;
        } catch (e) {
            throw e;
        }
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
            await this.programRepository.softDelete(program)
            return true;
        } catch (e) {
            throw e;
        }
    }

    public getDepartments = async (schoolId: number): Promise<Department[]> => {
        try {
            const data = this.departmentRepository.find({
                where: {
                    school_id: schoolId,
                }
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
                }
            })
            if (!department) return false;
            await this.departmentRepository.softDelete(department)
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
            const result = this.classRepository.save(Class);
            return result;
        } catch (e) {
            throw e;
        }
    }

    public deletClass = async (classId: number): Promise<boolean> => {
        try {
            const Class = await this.classRepository.findOne({
                where: {
                    id: classId,
                }
            })
            if (!Class) return false;
            const result = await this.classRepository.softDelete({ id: classId })
            if (!result.affected) return false;
            return true;
        } catch (e) {
            throw e;
        }
    }

    public getClasses = async (schoolId: number, departmentId: number, classId: number) => {
        try {
            const qb = this.classRepository
                .createQueryBuilder("class")
                .innerJoinAndSelect('class.department', 'department')
                .leftJoinAndSelect('class.teacher', 'teacher')
                .where('department.school_id = :schoolId', { schoolId: schoolId });

            if (departmentId) qb.andWhere('class.department_id = :departmentId', { departmentId: departmentId });
            if (classId) qb.andWhere('class.id = :classId', { classId: classId });

            if (classId) return qb.getOne();
            return qb.offset(0).take(15).getManyAndCount();
        } catch (e) {
            throw e;
        }
    }
}