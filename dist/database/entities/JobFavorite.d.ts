import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { Job } from "./Job";
export declare class JobFavorite extends CodeBase {
    id: number;
    student_id: number;
    job_id: number;
    student?: Student;
    job?: Job;
}
