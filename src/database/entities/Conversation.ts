import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { DetailConversation } from "./DetailConversation";
import { Business } from "./Business";

@Entity({ name: 'conversation' })
export class Conversation extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    business_id: number;

    @ManyToOne(() => Business, (business) => business.id)
    @JoinColumn({
        name: 'business_id',
        referencedColumnName: 'id'
    })
    business?: Business;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @OneToMany(() => DetailConversation, (detailConversation) => detailConversation.conversation)
    detailConversation?: DetailConversation[];
}