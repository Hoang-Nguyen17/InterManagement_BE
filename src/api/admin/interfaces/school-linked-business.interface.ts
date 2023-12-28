import { paging } from "../../../common/types/Pagination";

export interface FIlterSchoolLinkedBusiness extends paging {
    search_text?: string; 
    status?: boolean;
}