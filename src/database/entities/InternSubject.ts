import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany, RelationCount } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentLearnIntern } from "./StudentLearnIntern";

@Entity({ name: 'intern_subject' })
export class InternSubject extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    unit: number;

    @Column()
    sessions: number;

    @Column()
    max_students: number;

    @Column()
    teacher_id: number;

    @Column()
    department_id: number;

    @Column()
    academic_year: number;

    @Column()
    semester_id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column({ type: 'bool', default: true })
    is_open: boolean;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'teacher_id',
        referencedColumnName: 'id'
    })
    teacher?: Teacher;

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id)
    @JoinColumn({
        name: 'academic_year',
        referencedColumnName: 'id'
    })
    academicYear?: AcademicYear;

    @ManyToOne(() => Semester, (semester) => semester.id)
    @JoinColumn({
        name: 'semester_id',
        referencedColumnName: 'id'
    })
    semester?: Semester;

    @OneToMany(() => StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.internSubject)
    studentLearnIntern?: StudentLearnIntern;

    @RelationCount((internSubject: InternSubject) =>internSubject.studentLearnIntern)
    rest_count: number;
}