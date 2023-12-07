import { CodeBase } from "./CodeBase";
import { Notice } from "./Notice";
export declare class DetailNotice extends CodeBase {
    id: number;
    content: string;
    notice_id: number;
    notice?: Notice;
}
