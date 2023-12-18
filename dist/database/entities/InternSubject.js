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
exports.InternSubject = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Department_1 = require("./Department");
const Teacher_1 = require("./Teacher");
const AcademicYear_1 = require("./AcademicYear");
const Semester_1 = require("./Semester");
const StudentLearnIntern_1 = require("./StudentLearnIntern");
let InternSubject = class InternSubject extends CodeBase_1.CodeBase {
};
exports.InternSubject = InternSubject;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InternSubject.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "sessions", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "max_students", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "teacher_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "academic_year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternSubject.prototype, "semester_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], InternSubject.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], InternSubject.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department_1.Department, (department) => department.id),
    (0, typeorm_1.JoinColumn)({
        name: 'department_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Department_1.Department)
], InternSubject.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'teacher_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], InternSubject.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AcademicYear_1.AcademicYear, (academicYear) => academicYear.id),
    (0, typeorm_1.JoinColumn)({
        name: 'academic_year_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", AcademicYear_1.AcademicYear)
], InternSubject.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Semester_1.Semester, (semester) => semester.id),
    (0, typeorm_1.JoinColumn)({
        name: 'semester_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Semester_1.Semester)
], InternSubject.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => StudentLearnIntern_1.StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.internSubject, {
        createForeignKeyConstraints: false,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'id',
        referencedColumnName: 'subject_id'
    }),
    __metadata("design:type", StudentLearnIntern_1.StudentLearnIntern)
], InternSubject.prototype, "studentLearnIntern", void 0);
exports.InternSubject = InternSubject = __decorate([
    (0, typeorm_1.Entity)({ name: 'intern_subject' })
], InternSubject);
//# sourceMappingURL=InternSubject.js.map