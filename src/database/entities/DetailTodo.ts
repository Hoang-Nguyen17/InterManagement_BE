import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { RegularTodo } from "./RegularTodo";
import { TodoAppreciation } from "./TodoAppreciation";

export enum CompletedStatus {
    FAILED = 'FAILED',
    FINISHED = 'FINISHED',
    PROCESSING = 'PROCESSING',
}

export enum StatusFinished {
    OUT_OF_EXPIRE = 'OUT_OF_EXPIRE',
    ON_TIME = 'ON_TIME',
}
@Entity({ name: 'detail_todo' })
export class DetailTodo extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 200 })
    todo_name: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column({ type: 'enum', enum: CompletedStatus, default: CompletedStatus.PROCESSING })
    completed_status: CompletedStatus;

    @Column({ type: 'enum', enum: StatusFinished, nullable: true })
    out_of_expire: StatusFinished

    @Column()
    regular_id: number;

    @ManyToOne(() => RegularTodo, (regularTodo) => regularTodo.id)
    @JoinColumn({
        name: 'regular_id',
        referencedColumnName: 'id'
    })
    regularTodo?: RegularTodo;

    @OneToMany(() => TodoAppreciation, (todoAppreciation) => todoAppreciation.detailTodo)
    todoAppreciation?: TodoAppreciation[];
}