import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { DetailTodo } from "./DetailTodo";
import { Business } from "./Business";
export declare class RegularTodo extends CodeBase {
    id: number;
    student_id: number;
    business_id: number;
    business?: Business;
    student?: Student;
    detailTodo?: DetailTodo[];
}
