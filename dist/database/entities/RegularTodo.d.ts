import { CodeBase } from "./CodeBase";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { DetailTodo } from "./DetailTodo";
export declare class RegularTodo extends CodeBase {
    id: number;
    student_id: number;
    teacher_id: number;
    teacher?: Teacher;
    student?: Student;
    detailTodo?: DetailTodo[];
}
