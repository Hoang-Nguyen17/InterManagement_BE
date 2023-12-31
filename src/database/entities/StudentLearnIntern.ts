import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { status } from '../../common/constants/status.constant'
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { InternSubject } from "./InternSubject";

export enum PassStatus {
    FAILED = 'FAILED',
    STUDYING = 'STUDYING',
    PASSED = 'PASSED',
}

export enum RegistStatus {
    REGISTERING = 'REGISTERING',
    REJECTED = 'REJECTED',
    SUCCESSED = 'SUCCESSED',
}

@Entity({ name: 'student_learn_intern' })
export class StudentLearnIntern extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column({ nullable: true })
    score: number;

    @Column({ type: 'enum', enum: PassStatus, default: PassStatus.STUDYING })
    passed_status: PassStatus;

    @Column({ type: 'enum', enum: RegistStatus, default: RegistStatus.REGISTERING })
    regist_status: RegistStatus;

    @Column({ nullable: true })
    board_id: number;

    @Column()
    subject_id: number;

    @ManyToOne(() => ExaminationBoard, (examinationBoard) => examinationBoard.id)
    @JoinColumn({
        name: 'board_id',
        referencedColumnName: 'id'
    })
    board?: ExaminationBoard;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @ManyToOne(() => InternSubject, (internSubject) => internSubject.id)
    @JoinColumn({
        name: 'subject_id',
        referencedColumnName: 'id'
    })
    internSubject?: InternSubject;
}