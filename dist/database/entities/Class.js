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
exports.Class = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Department_1 = require("./Department");
const Teacher_1 = require("./Teacher");
const Student_1 = require("./Student");
let Class = class Class extends CodeBase_1.CodeBase {
};
exports.Class = Class;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Class.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Class.prototype, "class_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Class.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "academic_year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "head_teacher", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Class.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department_1.Department, (department) => department.id),
    (0, typeorm_1.JoinColumn)({
        name: 'department_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Department_1.Department)
], Class.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'head_teacher',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], Class.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Student_1.Student, (student) => student.program),
    __metadata("design:type", Array)
], Class.prototype, "student", void 0);
exports.Class = Class = __decorate([
    (0, typeorm_1.Entity)({ name: 'class' })
], Class);
//# sourceMappingURL=Class.js.map