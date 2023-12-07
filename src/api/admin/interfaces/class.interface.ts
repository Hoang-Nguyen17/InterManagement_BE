import { paging } from "../../../common/types/Pagination";

export interface FilterClass extends paging {
    academic_year?: number;
    head_teacher?: number;
    department_id?: number;
    search_text?: string; 
    school_id?: number;
}