import { CodeBase } from "./CodeBase";
import { Program } from "./Program";
import { Administrator } from "./Administrator";
import { Department } from "./Department";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentRequestRegistIntern } from "./StudentRequestRegistIntern";
import { SchoolLinkedBusiness } from "./SchoolLinkedBusiness";
export declare class School extends CodeBase {
    id: number;
    school_name: string;
    shorthand_name: string;
    avatar: string;
    establish_date: Date;
    study_field: string;
    program?: Program[];
    administrator?: Administrator[];
    department?: Department[];
    academicYear?: AcademicYear[];
    semesters?: Semester[];
    studentRequestRegistIntern?: StudentRequestRegistIntern[];
    schoolLinkedBusiness?: SchoolLinkedBusiness[];
}
