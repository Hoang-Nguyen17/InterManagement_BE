import { CodeBase } from "./CodeBase";
import { Student } from "./Student";
import { Applies } from "./Applies";
export declare enum InternStatus {
    REJECTED = "REJECTED",
    WAITING = "WAITING",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED"
}
export declare class InternJob extends CodeBase {
    id: number;
    start_date: Date;
    finished_date: Date;
    apply_id: number;
    is_interning: InternStatus;
    student_id: number;
    appreciation_file: string;
    apply?: Applies;
    student?: Student;
}
