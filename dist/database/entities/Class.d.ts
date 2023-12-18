import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
export declare class Class extends CodeBase {
    id: number;
    class_name: string;
    students: number;
    academic_year: number;
    head_teacher: number;
    department_id: number;
    department?: Department;
    teacher?: Teacher;
    student?: Student[];
}
