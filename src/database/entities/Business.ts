import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { UserPerson } from "./UserPerson";
import { Job } from "./Job";
import { SchoolLinkedBusiness } from "./SchoolLinkedBusiness";
import { RegularTodo } from "./RegularTodo";
import { Conversation } from "./Conversation";

@Entity({ name: 'business' })
export class Business extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    establish_date: Date;

    @Column({ type: 'nvarchar', length: 50 })
    industry_sector: string;

    @Column({ type: 'nvarchar', length: 50 })
    representator: string;


    @Column({ type: 'nvarchar', length: 500, nullable: true })
    short_desc: string;

    @OneToOne(() => UserPerson, (userPerson) => userPerson.id)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user_person?: UserPerson;

    @OneToMany(() => Job, (job) => job.business)
    job?: Job[];

    @OneToMany(() => SchoolLinkedBusiness, (schoolLinkedBusiness) => schoolLinkedBusiness.business)
    schoolLinkedBusiness?: SchoolLinkedBusiness[];

    @OneToMany(() => RegularTodo, (regularTodo) => regularTodo.business)
    regularTodo?: RegularTodo[];

    @OneToMany(() => Conversation, (conversation) => conversation.business)
    conversation?: Conversation[];
}