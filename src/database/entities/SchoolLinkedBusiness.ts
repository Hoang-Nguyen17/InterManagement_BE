import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { School } from "./School";
import { Business } from "./Business";

@Entity({ name: 'school_linked_business' })
export class SchoolLinkedBusiness extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    school_id: number;

    @Column()
    business_id: number;

    @Column({ default: false })
    is_linked: boolean;

    @Column({ default: false })
    is_linked_status: boolean;

    @ManyToOne(() => School, (school) => school.id)
    @JoinColumn({
        name: 'school_id',
        referencedColumnName: 'id'
    })
    school?: School;

    @ManyToOne(() => Business, (business) => business.id)
    @JoinColumn({
        name: 'business_id',
        referencedColumnName: 'id'
    })
    business?: Business;
}