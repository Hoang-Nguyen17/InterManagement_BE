import { CodeBase } from "./CodeBase";
import { Conversation } from "./Conversation";
import { UserPerson } from "./UserPerson";
export declare class DetailConversation extends CodeBase {
    id: number;
    content: string;
    attach_file: string;
    conversation_id: number;
    user_id: number;
    conversation?: Conversation;
    userPerson?: UserPerson;
}
