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
exports.UserPerson = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const UserAccount_1 = require("./UserAccount");
const Teacher_1 = require("./Teacher");
const Administrator_1 = require("./Administrator");
const Business_1 = require("./Business");
const DetailConversation_1 = require("./DetailConversation");
const Student_1 = require("./Student");
let UserPerson = class UserPerson extends CodeBase_1.CodeBase {
};
exports.UserPerson = UserPerson;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPerson.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UserPerson.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], UserPerson.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], UserPerson.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'char', length: 10 }),
    __metadata("design:type", String)
], UserPerson.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], UserPerson.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 100 }),
    __metadata("design:type", String)
], UserPerson.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserAccount_1.UserAccount, (userAccount) => userAccount.username),
    (0, typeorm_1.JoinColumn)({
        name: 'username',
        referencedColumnName: 'username',
    }),
    __metadata("design:type", UserAccount_1.UserAccount)
], UserPerson.prototype, "user_account", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Teacher_1.Teacher, (teacher) => teacher.user_id, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'id',
        referencedColumnName: 'user_id',
    }),
    __metadata("design:type", Teacher_1.Teacher)
], UserPerson.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Administrator_1.Administrator, (administrator) => administrator.user_id, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'id',
        referencedColumnName: 'user_id',
    }),
    __metadata("design:type", Administrator_1.Administrator)
], UserPerson.prototype, "administrator", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Business_1.Business, (business) => business.user_id, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'id',
        referencedColumnName: 'user_id',
    }),
    __metadata("design:type", Business_1.Business)
], UserPerson.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Business_1.Business, (business) => business.user_id, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'id',
        referencedColumnName: 'user_id',
    }),
    __metadata("design:type", Student_1.Student)
], UserPerson.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetailConversation_1.DetailConversation, (detailConversation) => detailConversation.userPerson),
    __metadata("design:type", Array)
], UserPerson.prototype, "detailConversation", void 0);
exports.UserPerson = UserPerson = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_person' })
], UserPerson);
//# sourceMappingURL=UserPerson.js.map