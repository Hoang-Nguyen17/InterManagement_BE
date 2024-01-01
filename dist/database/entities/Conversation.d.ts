import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { DetailConversation } from "./DetailConversation";
import { Business } from "./Business";
export declare class Conversation extends CodeBase {
    id: number;
    student_id: number;
    business_id: number;
    business?: Business;
    student?: Student;
    detailConversation?: DetailConversation[];
}
