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
exports.ExaminationBoard = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Department_1 = require("./Department");
const Teacher_1 = require("./Teacher");
const AcademicYear_1 = require("./AcademicYear");
const Semester_1 = require("./Semester");
const StudentLearnIntern_1 = require("./StudentLearnIntern");
let ExaminationBoard = class ExaminationBoard extends CodeBase_1.CodeBase {
};
exports.ExaminationBoard = ExaminationBoard;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "president", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "secretary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "asker", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "academic_year", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "semester_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ExaminationBoard.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], ExaminationBoard.prototype, "reporting_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'president',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], ExaminationBoard.prototype, "President", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'secretary',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], ExaminationBoard.prototype, "Secretary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'asker',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], ExaminationBoard.prototype, "Asker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AcademicYear_1.AcademicYear, (academicYear) => academicYear.id),
    (0, typeorm_1.JoinColumn)({
        name: 'academic_year',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", AcademicYear_1.AcademicYear)
], ExaminationBoard.prototype, "academicYear", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Semester_1.Semester, (semester) => semester.id),
    (0, typeorm_1.JoinColumn)({
        name: 'semester_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Semester_1.Semester)
], ExaminationBoard.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department_1.Department, (department) => department.id),
    (0, typeorm_1.JoinColumn)({
        name: 'department_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Department_1.Department)
], ExaminationBoard.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentLearnIntern_1.StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.board),
    __metadata("design:type", Array)
], ExaminationBoard.prototype, "studentLearnIntern", void 0);
exports.ExaminationBoard = ExaminationBoard = __decorate([
    (0, typeorm_1.Entity)({ name: 'examination_board' })
], ExaminationBoard);
//# sourceMappingURL=ExaminationBoard.js.map