import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, RelationId, RelationCount } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Business } from "./Business";
import { InternJob } from "./InternJob";
import { JobFavorite } from "./JobFavorite";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";
import { Applies } from "./Applies";
import { Position } from "./Position";
import { JobSkill } from "./JobSkill";

export enum WorkType {
    PART_TIME = 'PART_TIME',
    FULL_TIME = 'FULL_TIME',
}

export enum WorkSpace {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
    HYBRID = 'HYBRID',
}
@Entity({ name: 'job' })
export class Job extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 20, scale: 2 })
    salary: number;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: null, nullable: true })
    average_rate: number;

    @Column({ default: 0 })
    viewer_count: number;

    @Column({ type: 'enum', enum: WorkType, default: WorkType.FULL_TIME })
    work_type: WorkType;

    @Column({ type: 'enum', enum: WorkSpace, default: WorkSpace.OFFLINE })
    work_space: WorkSpace;

    @Column({ type: 'datetime' })
    expire_date: Date;

    @Column({ nullable: true })
    experience_years: number;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    image: string;

    @Column({ type: 'nvarchar', length: 50 })
    job_name: string;

    @Column({ type: 'nvarchar', length: 500 })
    job_desc: string;

    @Column({ type: 'nvarchar', length: 500 })
    requirements: string;

    @Column({ type: 'nvarchar', length: 500, nullable: true })
    another_information: string;

    @Column({ nullable: true })
    vacancies: number;

    @Column()
    business_id: number;

    @Column({ nullable: true })
    position_id: number;

    @ManyToOne(() => Business, (business) => business.id)
    @JoinColumn({
        name: 'business_id',
        referencedColumnName: 'id'
    })
    business?: Business;

    @OneToMany(() => InternJob, (internJob) => internJob.job)
    intern_job?: InternJob[];

    @OneToMany(() => JobFavorite, (jobFavorite) => jobFavorite.job)
    job_favorite?: JobFavorite[];

    @OneToMany(() => Applies, (applies) => applies.job)
    applies?: Applies[];

    @ManyToOne(() => Position, (position) => position.id)
    @JoinColumn({
        name: 'position_id',
        referencedColumnName: 'id'
    })
    position?: Position;

    @OneToMany(() => JobSkill, (jobSkill) => jobSkill.job)
    jobSkills?: JobSkill[];
    
    @RelationCount((job: Job) =>job.applies)
    count_apply: number;

    isApplied?: boolean;
}