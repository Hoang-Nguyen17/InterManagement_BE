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
exports.UserAccount = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const UserPerson_1 = require("./UserPerson");
const Permission_1 = require("./Permission");
let UserAccount = class UserAccount extends CodeBase_1.CodeBase {
};
exports.UserAccount = UserAccount;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ length: 50 }),
    __metadata("design:type", String)
], UserAccount.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], UserAccount.prototype, "pass", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserAccount.prototype, "permission_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumtext', nullable: true }),
    __metadata("design:type", String)
], UserAccount.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.username, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'username',
        referencedColumnName: 'username',
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], UserAccount.prototype, "user_person", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Permission_1.Permission, (permission) => permission.id),
    (0, typeorm_1.JoinColumn)({
        name: 'permission_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Permission_1.Permission)
], UserAccount.prototype, "permission", void 0);
exports.UserAccount = UserAccount = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_account' })
], UserAccount);
//# sourceMappingURL=UserAccount.js.map