import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { School } from "./School";
export declare enum RequestStatus {
    WAITTING = "WAITTING",
    REJECTED = "REJECTED",
    SENT = "SENT"
}
export declare class StudentRequestRegistIntern extends CodeBase {
    id: number;
    student_id: number;
    school_id: number;
    regist_submit_status: RequestStatus;
    file: string;
    student?: Student;
    school?: School;
}
