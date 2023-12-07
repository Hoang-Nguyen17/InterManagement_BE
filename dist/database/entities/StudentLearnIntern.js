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
exports.StudentLearnIntern = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const status_constant_1 = require("../../common/constants/status.constant");
const ExaminationBoard_1 = require("./ExaminationBoard");
const Student_1 = require("./Student");
const InternSubject_1 = require("./InternSubject");
let StudentLearnIntern = class StudentLearnIntern extends CodeBase_1.CodeBase {
};
exports.StudentLearnIntern = StudentLearnIntern;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.status.processing }),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "passed_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.status.finished }),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "regist_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "board_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentLearnIntern.prototype, "subject_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.id),
    (0, typeorm_1.JoinColumn)({
        name: 'board_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", ExaminationBoard_1.ExaminationBoard)
], StudentLearnIntern.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], StudentLearnIntern.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => InternSubject_1.InternSubject, (internSubject) => internSubject.id),
    (0, typeorm_1.JoinColumn)({
        name: 'subject_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", InternSubject_1.InternSubject)
], StudentLearnIntern.prototype, "internSubject", void 0);
exports.StudentLearnIntern = StudentLearnIntern = __decorate([
    (0, typeorm_1.Entity)({ name: 'student_learn_intern' })
], StudentLearnIntern);
//# sourceMappingURL=StudentLearnIntern.js.map