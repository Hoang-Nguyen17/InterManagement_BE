"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const UserAccount_1 = require("./UserAccount");
const status_constant_1 = require("../../common/constants/status.constant");
let Permission = class Permission {
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar' }),
    __metadata("design:type", Number)
], Permission.prototype, "permission_name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserAccount_1.UserAccount, (userAccount) => userAccount.permission),
    __metadata("design:type", Array)
], Permission.prototype, "user_account", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)({ name: 'permission' })
], Permission);
//# sourceMappingURL=Permission.js.map