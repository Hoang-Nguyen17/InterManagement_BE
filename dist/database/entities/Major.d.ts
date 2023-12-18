import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Student } from "./Student";
export declare class Major extends CodeBase {
    id: number;
    major_name: string;
    department_id: number;
    department?: Department;
    student: Student[];
}
