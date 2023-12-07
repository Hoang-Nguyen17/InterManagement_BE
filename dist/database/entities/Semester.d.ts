import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
export declare class Semester extends CodeBase {
    id: number;
    semester_name: string;
    internSubject?: InternSubject[];
    examinationBoard?: ExaminationBoard[];
}
