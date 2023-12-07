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
exports.School = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Program_1 = require("./Program");
const Administrator_1 = require("./Administrator");
const Department_1 = require("./Department");
let School = class School extends CodeBase_1.CodeBase {
};
exports.School = School;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], School.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], School.prototype, "school_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], School.prototype, "establish_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], School.prototype, "study_field", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Program_1.Program, (program) => program.school),
    __metadata("design:type", Array)
], School.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Administrator_1.Administrator, (administrator) => administrator.school),
    __metadata("design:type", Array)
], School.prototype, "administrator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Department_1.Department, (department) => department.school),
    __metadata("design:type", Array)
], School.prototype, "department", void 0);
exports.School = School = __decorate([
    (0, typeorm_1.Entity)({ name: 'school' })
], School);
//# sourceMappingURL=School.js.map