import { CodeBase } from "./CodeBase";
import { RegularTodo } from "./RegularTodo";
import { TodoAppreciation } from "./TodoAppreciation";
export declare enum CompletedStatus {
    FAILED = "FAILED",
    FINISHED = "FINISHED",
    PROCESSING = "PROCESSING"
}
export declare enum StatusFinished {
    OUT_OF_EXPIRE = "OUT_OF_EXPIRE",
    ON_TIME = "ON_TIME"
}
export declare class DetailTodo extends CodeBase {
    id: number;
    todo_name: string;
    start_date: Date;
    end_date: Date;
    completed_status: CompletedStatus;
    out_of_expire: StatusFinished;
    regular_id: number;
    regularTodo?: RegularTodo;
    todoAppreciation?: TodoAppreciation[];
}
