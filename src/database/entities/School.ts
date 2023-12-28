import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Program } from "./Program";
import { Administrator } from "./Administrator";
import { Department } from "./Department";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";
import { SchoolLinkedBusiness } from "./SchoolLinkedBusiness";

@Entity({ name: 'school' })
export class School extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 50 })
    school_name: string;

    @Column({ type: 'nvarchar', length: 50 })
    shorthand_name: string;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    avatar: string;

    @Column()
    establish_date: Date;

    @Column({ type: 'nvarchar', length: 50 })
    study_field: string;

    @OneToMany(() => Program, (program) => program.school)
    program?: Program[];

    @OneToMany(() => Administrator, (administrator) => administrator.school)
    administrator?: Administrator[];

    @OneToMany(() => Department, (department) => department.school)
    department?: Department[];

    @OneToMany(() => AcademicYear, (academicYear) => academicYear.school)
    academicYear?: AcademicYear[];

    @OneToMany(() => Semester, (semesters) => semesters.school)
    semesters?: Semester[];

    @OneToMany(() => StudentRequestRegistIntern, (studentRequestRegistIntern) => studentRequestRegistIntern.school)
    studentRequestRegistIntern?: StudentRequestRegistIntern[];

    @OneToMany(() => SchoolLinkedBusiness, (schoolLinkedBusiness) => schoolLinkedBusiness.school)
    schoolLinkedBusiness?: SchoolLinkedBusiness[];
}