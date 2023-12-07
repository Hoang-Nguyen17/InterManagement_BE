import { CodeBase } from "./CodeBase";
import { status } from '../../common/constants/status.constant';
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { InternSubject } from "./InternSubject";
export declare class StudentLearnIntern extends CodeBase {
    id: number;
    student_id: number;
    score: number;
    passed_status: status;
    regist_status: status;
    board_id: number;
    subject_id: number;
    board?: ExaminationBoard;
    student?: Student;
    internSubject?: InternSubject;
}
