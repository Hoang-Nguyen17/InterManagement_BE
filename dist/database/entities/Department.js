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
exports.Department = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const School_1 = require("./School");
const Major_1 = require("./Major");
const Class_1 = require("./Class");
const Teacher_1 = require("./Teacher");
const InternSubject_1 = require("./InternSubject");
const ExaminationBoard_1 = require("./ExaminationBoard");
let Department = class Department extends CodeBase_1.CodeBase {
};
exports.Department = Department;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Department.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Department.prototype, "department_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Department.prototype, "department_head", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Department.prototype, "school_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => School_1.School, (school) => school.id),
    (0, typeorm_1.JoinColumn)({
        name: 'school_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", School_1.School)
], Department.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Major_1.Major, (major) => major.department),
    __metadata("design:type", Array)
], Department.prototype, "major", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Class_1.Class, (Class) => Class.department),
    __metadata("design:type", Array)
], Department.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'department_head',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Teacher_1.Teacher)
], Department.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InternSubject_1.InternSubject, (internSubject) => internSubject.department),
    __metadata("design:type", Array)
], Department.prototype, "intern_subject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.department),
    __metadata("design:type", Array)
], Department.prototype, "examinationBoard", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Teacher_1.Teacher, (teacher) => teacher.department),
    __metadata("design:type", Array)
], Department.prototype, "teachers", void 0);
exports.Department = Department = __decorate([
    (0, typeorm_1.Entity)({ name: 'department' })
], Department);
//# sourceMappingURL=Department.js.map