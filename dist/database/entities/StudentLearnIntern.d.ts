import { CodeBase } from "./CodeBase";
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { InternSubject } from "./InternSubject";
export declare enum PassStatus {
    FAILED = "FAILED",
    STUDYING = "STUDYING",
    PASSED = "PASSED"
}
export declare enum RegistStatus {
    REGISTERING = "REGISTERING",
    REJECTED = "REJECTED",
    SUCCESSED = "SUCCESSED"
}
export declare class StudentLearnIntern extends CodeBase {
    id: number;
    student_id: number;
    score: number;
    passed_status: PassStatus;
    regist_status: RegistStatus;
    board_id: number;
    subject_id: number;
    board?: ExaminationBoard;
    student?: Student;
    internSubject?: InternSubject;
}
