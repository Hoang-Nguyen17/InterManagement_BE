import { CodeBase } from "./CodeBase";
import { School } from "./School";
import { Student } from "./Student";
export declare class Program extends CodeBase {
    id: number;
    program_name: string;
    school_id: number;
    school?: School;
    student: Student[];
}
