import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Student } from "./Student";

@Entity({ name: 'report' })
export class Report extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column({ length: 500, nullable: true })
    report_file: string;

    @Column({ length: 500, nullable: true })
    result_business_file: string;

    @Column({ length: 500, nullable: true })
    result_teacher_file: string;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;
}