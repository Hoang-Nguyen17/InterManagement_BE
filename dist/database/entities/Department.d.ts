import { CodeBase } from "./CodeBase";
import { School } from "./School";
import { Major } from "./Major";
import { Class } from "./Class";
import { Teacher } from "./Teacher";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
export declare class Department extends CodeBase {
    id: number;
    department_name: string;
    department_head: number;
    school_id: number;
    school?: School;
    major?: Major[];
    class?: Class[];
    teacher?: Teacher;
    intern_subject?: InternSubject[];
    examinationBoard?: ExaminationBoard[];
    teachers?: Teacher[];
}
