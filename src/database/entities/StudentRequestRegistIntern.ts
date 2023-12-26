import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { status } from "../../common/constants/status.constant";
import { Job } from "./Job";
import { School } from "./School";

export enum RequestStatus {
    WAITTING = 'WAITTING',
    REJECTED = 'REJECTED',
    SENT = 'SENT',
}

@Entity({ name: 'student_request_regist_intern' })
export class StudentRequestRegistIntern extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    school_id: number;

    @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.WAITTING })
    regist_submit_status: RequestStatus;

    @Column({ length: 500 })
    file: string;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @ManyToOne(() => School, (school) => school.id)
    @JoinColumn({
        name: 'school_id',
        referencedColumnName: 'id'
    })
    school?: School;
}