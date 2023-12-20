import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Job } from "./Job";

@Entity({ name: 'position' })
export class Position extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    position_name: string;

    @OneToMany(() => Job, (job) => job.position)
    jobs: Job[];
}