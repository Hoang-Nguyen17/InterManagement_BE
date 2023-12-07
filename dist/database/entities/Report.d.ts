import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
export declare class Report extends CodeBase {
    id: number;
    student_id: number;
    report_file: string;
    result_business_file: string;
    result_teacher_file: string;
    student?: Student;
}
