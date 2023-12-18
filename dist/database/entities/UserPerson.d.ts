import { CodeBase } from "./CodeBase";
import { UserAccount } from "./UserAccount";
import { Teacher } from "./Teacher";
import { Administrator } from "./Administrator";
import { Business } from "./Business";
import { DetailConversation } from "./DetailConversation";
import { Student } from "./Student";
export declare class UserPerson extends CodeBase {
    id: number;
    username: string;
    full_name: string;
    image: string;
    phone: string;
    email: string;
    address: string;
    user_account?: UserAccount;
    teacher?: Teacher;
    administrator?: Administrator;
    business?: Business;
    student?: Student;
    detailConversation?: DetailConversation[];
}
