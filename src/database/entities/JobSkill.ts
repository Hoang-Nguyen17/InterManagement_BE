import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Job } from "./Job";
import { Skill } from "./skill";

@Entity({ name: 'job_skill' })
export class JobSkill extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    job_id: number;

    @Column()
    skill_id: number;

    @ManyToOne(() => Job, (job) => job.id)
    @JoinColumn({
        name: 'job_id',
        referencedColumnName: 'id',
    })
    job: Job;

    @ManyToOne(() => Skill, (skill) => skill.id)
    @JoinColumn({
        name: 'skill_id',
        referencedColumnName: 'id',
    })
    skill: Skill;
}