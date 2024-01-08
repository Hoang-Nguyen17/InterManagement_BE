import { WorkSpace, WorkType } from "../../../database/entities/Job";
import { paging } from "../../../common/types/Pagination";

export interface FilterJob extends paging {
    businessId?: number;
    studentId?: number;
    search_text?: string;
    trending?: boolean;
    majorId?: number;
    position_id?: number;
    skill_id?: number;
    work_type?: WorkType
    work_space?: WorkSpace;
}