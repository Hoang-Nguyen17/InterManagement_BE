import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { status } from "../../common/constants/status.constant";
import { Job } from "./Job";
export declare class StudentRequestRegistIntern extends CodeBase {
    id: number;
    student_id: number;
    regist_submit_status: status;
    job_id: number;
    file: string;
    job?: Job;
    student?: Student;
}
