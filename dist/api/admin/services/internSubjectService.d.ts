import { DeepPartial, FindOneOptions } from "typeorm";
import { InternSubject } from "../../../database/entities/InternSubject";
import { subjectFilter } from "../interfaces/subjectFilter.interface";
export declare class InternSubjectService {
    private internSubjectRes;
    private userService;
    private schoolService;
    private userSchoolService;
    save(data: DeepPartial<InternSubject>): Promise<InternSubject>;
    getOne(filter?: FindOneOptions<InternSubject>): Promise<InternSubject>;
    deleteInternSubjects(subjectIds: number[], schoolId: number): Promise<InternSubject[]>;
    getInternSubjects(filter: subjectFilter): Promise<InternSubject[]>;
    saveInternSubject(InternSubject: InternSubject): Promise<InternSubject>;
}
