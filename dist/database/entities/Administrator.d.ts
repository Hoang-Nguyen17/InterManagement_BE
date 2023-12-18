import { CodeBase } from "./CodeBase";
import { accountStatus } from "../../common/constants/status.constant";
import { School } from "./School";
import { UserPerson } from "./UserPerson";
import { Notice } from "./Notice";
export declare class Administrator extends CodeBase {
    id: number;
    account_status: accountStatus;
    school_id: number;
    user_id: number;
    school?: School;
    user_person: UserPerson;
    notice?: Notice[];
}
