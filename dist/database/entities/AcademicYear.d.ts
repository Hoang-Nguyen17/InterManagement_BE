import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { School } from "./School";
export declare class AcademicYear extends CodeBase {
    id: number;
    current_year: number;
    school_id: number;
    internSubject?: InternSubject[];
    examinationBoard?: ExaminationBoard[];
    school?: School;
}
