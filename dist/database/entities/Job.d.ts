import { CodeBase } from "./CodeBase";
import { Business } from "./Business";
import { Skill } from "./skill";
import { InternJob } from "./InternJob";
import { JobFavorite } from "./JobFavorite";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";
export declare class Job extends CodeBase {
    id: number;
    image: string;
    job_name: string;
    job_desc: string;
    requirements: string;
    another_information: string;
    vacancies: number;
    business_id: number;
    business?: Business;
    skill?: Skill[];
    intern_job?: InternJob[];
    job_favorite?: JobFavorite[];
    studentRequestRegistIntern?: StudentRequestRegistIntern[];
}
