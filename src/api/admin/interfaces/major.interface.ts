import { paging } from "../../../common/types/Pagination";

export interface FilterMajor extends paging {
    department_id?: number;
    search_text?: string; 
    schoolId: number;
}