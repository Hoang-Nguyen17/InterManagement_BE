import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentLearnIntern } from "./StudentLearnIntern";
export declare class ExaminationBoard extends CodeBase {
    id: number;
    president: number;
    secretary: number;
    asker: number;
    academic_year: number;
    semester_id: number;
    department_id: number;
    reporting_date: Date;
    President?: Teacher;
    Secretary?: Teacher;
    Asker?: Teacher;
    academicYear?: AcademicYear;
    semester?: Semester;
    department?: Department;
    studentLearnIntern?: StudentLearnIntern[];
}
