import { CodeBase } from "./CodeBase";
import { DetailTodo } from "./DetailTodo";
export declare class TodoAppreciation extends CodeBase {
    id: number;
    content: string;
    todo_id: number;
    detailTodo?: DetailTodo;
}
