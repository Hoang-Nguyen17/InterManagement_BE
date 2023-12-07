import { CodeBase } from "./CodeBase";
import { Program } from "./Program";
import { Administrator } from "./Administrator";
import { Department } from "./Department";
export declare class School extends CodeBase {
    id: number;
    school_name: string;
    establish_date: Date;
    study_field: string;
    program?: Program[];
    administrator?: Administrator[];
    department?: Department[];
}
