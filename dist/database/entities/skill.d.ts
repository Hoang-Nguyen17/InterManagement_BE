import { CodeBase } from "./CodeBase";
import { Job } from "./Job";
export declare class Skill extends CodeBase {
    id: number;
    skill_name: string;
    job_id: number;
    job?: Job;
}
