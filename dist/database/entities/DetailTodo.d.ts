import { CodeBase } from "./CodeBase";
import { statusFinished, status } from "../../common/constants/status.constant";
import { RegularTodo } from "./RegularTodo";
import { TodoAppreciation } from "./TodoAppreciation";
export declare class DetailTodo extends CodeBase {
    id: number;
    todo_name: string;
    start_date: Date;
    end_date: Date;
    completed_status: status;
    out_of_expire: statusFinished;
    regular_id: number;
    regularTodo?: RegularTodo;
    todoAppreciation?: TodoAppreciation[];
}
