import { UserAccount } from './UserAccount';
import { role } from '../../common/constants/status.constant';
export declare class Permission {
    id: number;
    permission_name: role;
    user_account: UserAccount[];
}
