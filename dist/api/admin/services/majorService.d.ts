import { Major } from "../../../database/entities/Major";
export declare class MajorService {
    private majorRes;
    getMajors(): Promise<Major[]>;
}
