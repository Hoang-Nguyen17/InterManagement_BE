import { CodeBase } from "./CodeBase";
import { UserPerson } from "./UserPerson";
import { Job } from "./Job";
import { SchoolLinkedBusiness } from "./SchoolLinkedBusiness";
import { RegularTodo } from "./RegularTodo";
import { Conversation } from "./Conversation";
export declare class Business extends CodeBase {
    id: number;
    user_id: number;
    establish_date: Date;
    industry_sector: string;
    representator: string;
    short_desc: string;
    user_person?: UserPerson;
    job?: Job[];
    schoolLinkedBusiness?: SchoolLinkedBusiness[];
    regularTodo?: RegularTodo[];
    conversation?: Conversation[];
}
