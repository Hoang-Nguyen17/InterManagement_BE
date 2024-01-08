import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { Applies } from "./Applies";

export enum InternStatus {
    WAITING = 'WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}
@Entity({ name: 'intern_job' })
export class InternJob extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    start_date: Date;

    @Column({ nullable: true })
    finished_date: Date;

    @Column()
    apply_id: number;

    @Column({ type: 'enum', enum: InternStatus, default: InternStatus.WAITING })
    is_interning: InternStatus;

    @Column()
    student_id: number;

    @Column({ length: 500, nullable: true })
    appreciation_file: string;

    @OneToOne(() => Applies, (apply) => apply.id)
    @JoinColumn({
        name: 'apply_id',
        referencedColumnName: 'id'
    })
    apply?: Applies;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;
}