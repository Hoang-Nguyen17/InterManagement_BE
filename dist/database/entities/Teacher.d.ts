import { CodeBase } from "./CodeBase";
import { TeachingStatus } from '../../common/constants/status.constant';
import { UserPerson } from "./UserPerson";
import { Department } from "./Department";
import { Class } from "./Class";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { Conversation } from "./Conversation";
import { RegularTodo } from "./RegularTodo";
export declare class Teacher extends CodeBase {
    id: number;
    user_id: number;
    dob: Date;
    start_date: Date;
    education_level: string;
    experience_year: number;
    current_status: TeachingStatus;
    department_id: number;
    department?: Department;
    user_person?: UserPerson;
    class?: Class[];
    intern_subject?: InternSubject[];
    examinationBoardPresident?: ExaminationBoard[];
    examinationBoardSecretary?: ExaminationBoard[];
    examinationBoardAsker?: ExaminationBoard[];
    conversation?: Conversation[];
    regularTodo?: RegularTodo[];
}
