import { paging } from "../../../common/types/Pagination";

export interface FilterJob extends paging {
    businessId?: number;
    studentId?: number;
    search_text?: string;
}