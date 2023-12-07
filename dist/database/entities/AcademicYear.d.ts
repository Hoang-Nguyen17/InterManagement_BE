import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
export declare class AcademicYear extends CodeBase {
    id: number;
    current_year: number;
    internSubject?: InternSubject[];
    examinationBoard?: ExaminationBoard[];
}
