import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { status } from "../../common/constants/status.constant";
import { Job } from "./Job";
export declare class InternJob extends CodeBase {
    id: number;
    start_date: Date;
    submit_status: status;
    job_id: number;
    is_interning: status;
    student_id: number;
    appreciation_file: string;
    job?: Job;
    student?: Student;
}
