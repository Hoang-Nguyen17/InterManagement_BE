import { StudentLearnIntern } from "../../../database/entities/StudentLearnIntern";
import { IStudentLearnInternSubject } from "../interfaces/studentLearnInternFilter.interface";
export declare class StudentLearInternService {
    private studentLearnInternRes;
    getStudentLearnIntern(filter?: IStudentLearnInternSubject): Promise<[StudentLearnIntern[], number]>;
}
