import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { JobSkill } from "./JobSkill";

@Entity({ name: 'skill' })
export class Skill extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 100 })
    skill_name: string;

    @OneToMany(() => JobSkill, (jobSkill) => jobSkill.skill)
    jobSkills?: JobSkill[];
}