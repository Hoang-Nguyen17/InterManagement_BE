import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentLearnIntern } from "./StudentLearnIntern";
export declare class InternSubject extends CodeBase {
    id: number;
    name: string;
    unit: number;
    sessions: number;
    max_students: number;
    teacher_id: number;
    department_id: number;
    academic_year: number;
    semester_id: number;
    start_date: Date;
    end_date: Date;
    department?: Department;
    teacher?: Teacher;
    academicYear?: AcademicYear;
    semester?: Semester;
    studentLearnIntern?: StudentLearnIntern;
}
