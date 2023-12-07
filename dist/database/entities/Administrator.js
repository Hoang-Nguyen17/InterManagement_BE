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
exports.Administrator = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const status_constant_1 = require("../../common/constants/status.constant");
const School_1 = require("./School");
const UserPerson_1 = require("./UserPerson");
const Notice_1 = require("./Notice");
let Administrator = class Administrator extends CodeBase_1.CodeBase {
};
exports.Administrator = Administrator;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Administrator.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.accountStatus.Enabled }),
    __metadata("design:type", Number)
], Administrator.prototype, "account_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Administrator.prototype, "school_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Administrator.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => School_1.School, (school) => school.id),
    (0, typeorm_1.JoinColumn)({
        name: 'school_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", School_1.School)
], Administrator.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], Administrator.prototype, "user_person", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notice_1.Notice, (notice) => notice.administrator),
    __metadata("design:type", Array)
], Administrator.prototype, "notice", void 0);
exports.Administrator = Administrator = __decorate([
    (0, typeorm_1.Entity)({ name: 'administrator' })
], Administrator);
//# sourceMappingURL=Administrator.js.map