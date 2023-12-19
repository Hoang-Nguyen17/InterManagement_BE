import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { School } from "./School";

@Entity({ name: 'semester' })
export class Semester extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 20 })
    semester_name: string;

    @Column()
    school_id: number;

    @OneToMany(() => InternSubject, (internSubject) => internSubject.semester)
    internSubject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.semester)
    examinationBoard?: ExaminationBoard[];

    @ManyToOne(() => School, (school) => school.semesters)
    school?: School;
}