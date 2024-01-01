import { CodeBase } from "./CodeBase";
import { JobSkill } from "./JobSkill";
export declare class Skill extends CodeBase {
    id: number;
    skill_name: string;
    jobSkills?: JobSkill[];
}
