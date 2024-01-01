import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, Index, Unique } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { Job } from "./Job";
import { Max, Min } from "class-validator";

export enum AppliesStatus {
    APPLYING = 'APPLYING',
    INTERVIEWING = 'INTERVIEWING',
    FAILED = 'FAILED',
    ONBOARD = 'ONBOARD',
    FINISHED = 'FINISHED',
}

@Entity({ name: 'applies' })
export class Applies extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    job_id: number;

    @Column({ length: 500 })
    cv_file: string;

    @Column({ length: 500, nullable: true })
    introducing_file: string;

    @Column({ nullable: true })
    @Min(1)
    @Max(5)
    rate_point: number;

    @Column({ type: 'enum', enum: AppliesStatus, default: AppliesStatus.APPLYING })
    apply_status: AppliesStatus;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id',
    })
    student?: Student;

    @ManyToOne(() => Job, (job) => job.id)
    @JoinColumn({
        name: 'job_id',
        referencedColumnName: 'id',
    })
    job?: Job;
}