import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { Administrator } from "./Administrator";
import { DetailNotice } from "./DetailNotice";
export declare class Notice extends CodeBase {
    id: number;
    student_id: number;
    admin_id: number;
    student?: Student;
    administrator?: Administrator;
    detailNotice?: DetailNotice[];
}
