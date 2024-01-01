import { CodeBase } from "./CodeBase";
import { Business } from "./Business";
import { InternJob } from "./InternJob";
import { JobFavorite } from "./JobFavorite";
import { Applies } from "./Applies";
import { Position } from "./Position";
import { JobSkill } from "./JobSkill";
export declare enum WorkType {
    PART_TIME = "PART_TIME",
    FULL_TIME = "FULL_TIME"
}
export declare enum WorkSpace {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE",
    HYBRID = "HYBRID"
}
export declare class Job extends CodeBase {
    id: number;
    salary: number;
    average_rate: number;
    viewer_count: number;
    work_type: WorkType;
    work_space: WorkSpace;
    expire_date: Date;
    experience_years: number;
    image: string;
    job_name: string;
    job_desc: string;
    requirements: string;
    another_information: string;
    vacancies: number;
    business_id: number;
    position_id: number;
    business?: Business;
    intern_job?: InternJob[];
    job_favorite?: JobFavorite[];
    applies?: Applies[];
    position?: Position;
    jobSkills?: JobSkill[];
    count_apply: number;
    isApplied?: boolean;
}
