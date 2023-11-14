import { Brackets, DeepPartial, FindOneOptions, In } from "typeorm";
import { InternSubject } from "../../../database/entities/InternSubject";
import { AppDataSource } from "../../../ormconfig";
import { subjectFilter } from "../interface/subjectFilter.interface";
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

    async getSubjectDetail(subjectId: number) {
        const data = await this.getOne({
            where: { id: subjectId },
            relations: [
                'department', 'teacher', 'academicYear', 'semester', 'studentLearnIntern'
            ]
        })
        return data;
    }

    async deleteInternSubjects(subjectIds: number[]) {
        return await this.internSubjectRes.softDelete({ id: In(subjectIds) });
    }

    async getInternSubjects(filter: subjectFilter) {
        const { take, page } = filter;
        const qb = this.internSubjectRes
            .createQueryBuilder('subject')
            .leftJoinAndSelect('subject.teacher', 'teacher')
            .leftJoinAndSelect('teacher.user_person', 'userPerson')
            .leftJoinAndSelect('subject.department', 'department')
            .leftJoinAndSelect('subject.academicYear', 'academicYear')
            .leftJoinAndSelect('subject.semester', 'semester')

        filter.academic_year && qb.andWhere('subject.academic_year = :academicYear', { academicYear: filter.academic_year });
        filter.semester_id && qb.andWhere('subject.semester_id = :semester', { semester: filter.semester_id });
        filter.teacher_id && qb.andWhere('subject.teacher_id = teacherId', { teacherId: filter.teacher_id });
        filter.department_id && qb.andWhere('subject.department_id = :departmentId', { departmentId: filter.department_id });
        filter.search && qb.andWhere(new Brackets((qb) => {
            qb
                .orWhere('subject.name ILIKE :searchText', { searchText: filter.search })
                .orWhere('userPerson.full_name ILIKE :searchtext', { searchText: filter.search })
                .orWhere('department.department_name ILIKE :searchText', { searchText: filter.search });
        }));

        const data = await qb.skip((page - 1) * take).take(take).getManyAndCount();
        return data;
    }

    // Intern Subject
    async saveInternSubject(InternSubject: InternSubject): Promise<InternSubject> {
        await Promise.all([
            this.userService.getOneTeacher({
                where: {
                    id: InternSubject.teacher_id
                }
            }),
            this.schoolService.getOneDepartment({
                where: {
                    id: InternSubject.department_id
                }
            }),
            await this.userSchoolService.getOneAcademicYear({
                where: {
                    id: InternSubject.academic_year
                }
            }),
            await this.userSchoolService.getOneSemester({
                where: {
                    id: InternSubject.semester_id
                }
            })
        ]).then((result) => {
            result.forEach((e) => {
                if (!e) {
                    console.log(typeof e, 'not found');
                    return;
                }
            })
        })

        if (InternSubject.id) {
            const subject = await this.schoolService.getOneInternSubject({ where: { id: InternSubject.id } });
            if (!subject) return;

            subject.name = InternSubject.name;
            subject.max_students = InternSubject.max_students;
            subject.academic_year = InternSubject.academic_year;
            subject.department_id = InternSubject.department_id;
            subject.semester_id = InternSubject.semester_id;
            subject.sessions = InternSubject.sessions;
            subject.unit = InternSubject.unit;
            subject.teacher_id = InternSubject.teacher_id;
            subject.start_date = InternSubject.start_date;
            subject.end_date = InternSubject.end_date;

            const result = await this.save(subject);
            return result;
        }
        const result = await this.save(InternSubject);
        return result;
    }
}