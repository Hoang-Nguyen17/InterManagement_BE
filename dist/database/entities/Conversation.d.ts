import { CodeBase } from "./CodeBase";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { DetailConversation } from "./DetailConversation";
export declare class Conversation extends CodeBase {
    id: number;
    student_id: number;
    teacher_id: number;
    teacher?: Teacher;
    student?: Student;
    detailConversation?: DetailConversation[];
}
