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
exports.AcademicYear = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const InternSubject_1 = require("./InternSubject");
const ExaminationBoard_1 = require("./ExaminationBoard");
let AcademicYear = class AcademicYear extends CodeBase_1.CodeBase {
};
exports.AcademicYear = AcademicYear;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AcademicYear.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AcademicYear.prototype, "current_year", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InternSubject_1.InternSubject, (internSubject) => internSubject.academicYear),
    __metadata("design:type", Array)
], AcademicYear.prototype, "internSubject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.academicYear),
    __metadata("design:type", Array)
], AcademicYear.prototype, "examinationBoard", void 0);
exports.AcademicYear = AcademicYear = __decorate([
    (0, typeorm_1.Entity)({ name: 'academic_year' })
], AcademicYear);
//# sourceMappingURL=AcademicYear.js.map