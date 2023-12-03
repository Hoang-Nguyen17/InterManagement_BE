import { Brackets, DeepPartial, FindOneOptions, In } from "typeorm";
import { InternSubject } from "../../../database/entities/InternSubject";
import { AppDataSource } from "../../../ormconfig";
import { subjectFilter } from "../interfaces/subjectFilter.interface";
import { UserService } from "./userService";
import { SchoolService } from "./schoolService";
import { SchoolService as UserSchoolService } from "../../user/services/schoolService";

export class InternSubjectService {
    private internSubjectRes = AppDataSource.getRepository(InternSubject);
    private userService = new UserService();
    private schoolService = new SchoolService();
    private userSchoolService = new UserSchoolService();

    async save(data: DeepPartial<InternSubject>): Promise<InternSubject> {
        return await this.internSubjectRes.save(data);
    }

    async getOne(filter?: FindOneOptions<InternSubject>) {
        return await this.internSubjectRes.findOne(filter);
    }

    async deleteInternSubjects(subjectIds: number[], schoolId: number) {
        const subjects = await this.internSubjectRes.createQueryBuilder('subject')
            .leftJoinAndSelect('subject.department', 'department')
            .where('subject.id In (:...ids)', { ids: subjectIds })
            .andWhere('department.school_id = :schoolId', { schoolId })
            .getMany();
        return await this.internSubjectRes.softRemove(subjects);
    }

    async getInternSubjects(filter: subjectFilter) {
        const qb = this.internSubjectRes
            .createQueryBuilder('subject')
            .leftJoinAndSelect('subject.teacher', 'teacher')
            .leftJoinAndSelect('teacher.user_person', 'userPerson')
            .leftJoinAndSelect('subject.department', 'department')
            .leftJoinAndSelect('subject.academicYear', 'academicYear')
            .leftJoinAndSelect('subject.semester', 'semester')

        filter.academic_year && qb.andWhere('subject.academic_year = :academicYear', { academicYear: filter.academic_year });
        filter.semester_id && qb.andWhere('subject.semester_id = :semester', { semester: filter.semester_id });
        filter.department_id && qb.andWhere('subject.department_id = :departmentId', { departmentId: filter.department_id });
        filter.search && qb.andWhere(new Brackets((qb) => {
            qb
                .orWhere('subject.name ILIKE :searchText', { searchText: filter.search })
                .orWhere('userPerson.full_name ILIKE :searchtext', { searchText: filter.search })
                .orWhere('department.department_name ILIKE :searchText', { searchText: filter.search });
        }));

        const data = await qb.orderBy('subject.createdAt', 'DESC').getMany();
        return data;
    }

    // Intern Subject
    async saveInternSubject(InternSubject: InternSubject): Promise<InternSubject> {
        const result = await this.save(InternSubject);
        return result;
    }
}