import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { School } from "./School";

@Entity({ name: 'academic_year' })
export class AcademicYear extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    current_year: number;

    @Column()
    school_id: number;

    @OneToMany(() => InternSubject, (internSubject) => internSubject.academicYear)
    internSubject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.academicYear)
    examinationBoard?: ExaminationBoard[];

    @ManyToOne(() => School, (school) => school.academicYear)
    school?: School;
}