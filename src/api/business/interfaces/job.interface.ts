import { paging } from "../../../common/types/Pagination";

export interface FilterJob extends paging {
    businessId?: number;
    search_text?: string;
}