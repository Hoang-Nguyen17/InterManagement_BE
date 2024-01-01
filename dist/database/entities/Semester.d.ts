import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { School } from "./School";
export declare class Semester extends CodeBase {
    id: number;
    semester_name: string;
    school_id: number;
    internSubject?: InternSubject[];
    examinationBoard?: ExaminationBoard[];
    school?: School;
}
