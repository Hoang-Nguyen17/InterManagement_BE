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
exports.Business = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const UserPerson_1 = require("./UserPerson");
const Job_1 = require("./Job");
let Business = class Business extends CodeBase_1.CodeBase {
};
exports.Business = Business;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Business.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Business.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Business.prototype, "establish_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Business.prototype, "industry_sector", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Business.prototype, "representator", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Business.prototype, "short_desc", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], Business.prototype, "user_person", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Job_1.Job, (job) => job.business),
    __metadata("design:type", Array)
], Business.prototype, "job", void 0);
exports.Business = Business = __decorate([
    (0, typeorm_1.Entity)({ name: 'business' })
], Business);
//# sourceMappingURL=Business.js.map