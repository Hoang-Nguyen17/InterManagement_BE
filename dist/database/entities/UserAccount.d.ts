import { CodeBase } from './CodeBase';
import { UserPerson } from './UserPerson';
import { Permission } from './Permission';
export declare class UserAccount extends CodeBase {
    username?: string;
    pass: string;
    permission_id: number;
    token: string;
    user_person?: UserPerson;
    permission?: Permission;
}
