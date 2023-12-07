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
exports.Student = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const status_constant_1 = require("../../common/constants/status.constant");
const UserPerson_1 = require("./UserPerson");
const Class_1 = require("./Class");
const gender_constant_1 = require("../../common/constants/gender.constant");
const Program_1 = require("./Program");
const Major_1 = require("./Major");
const InternJob_1 = require("./InternJob");
const JobFavorite_1 = require("./JobFavorite");
const StudentLearnIntern_1 = require("./StudentLearnIntern");
const StudentRequestRegistIntern_1 = require("./StudentRequestRegistIntern");
const Notice_1 = require("./Notice");
const Report_1 = require("./Report");
const Conversation_1 = require("./Conversation");
const RegularTodo_1 = require("./RegularTodo");
let Student = class Student extends CodeBase_1.CodeBase {
};
exports.Student = Student;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Student.prototype, "admission_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Student.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: gender_constant_1.gender.men }),
    __metadata("design:type", String)
], Student.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.studyingStatus.studying }),
    __metadata("design:type", Number)
], Student.prototype, "current_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "program_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "major_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Student.prototype, "class_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Program_1.Program, (program) => program.id),
    (0, typeorm_1.JoinColumn)({
        name: 'program_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Program_1.Program)
], Student.prototype, "program", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Major_1.Major, (major) => major.id),
    (0, typeorm_1.JoinColumn)({
        name: 'major_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Major_1.Major)
], Student.prototype, "major", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Class_1.Class, (Class) => Class.id),
    (0, typeorm_1.JoinColumn)({
        name: 'class_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Class_1.Class)
], Student.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], Student.prototype, "user_person", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InternJob_1.InternJob, (internJob) => internJob.student),
    __metadata("design:type", Array)
], Student.prototype, "Intern_job", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobFavorite_1.JobFavorite, (jobFavorite) => jobFavorite.student),
    __metadata("design:type", Array)
], Student.prototype, "job_favorite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentLearnIntern_1.StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.student),
    __metadata("design:type", Array)
], Student.prototype, "studentLearnIntern", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentRequestRegistIntern_1.StudentRequestRegistIntern, (studentRequestRegistIntern) => studentRequestRegistIntern.student),
    __metadata("design:type", Array)
], Student.prototype, "studentRequestRegistIntern", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notice_1.Notice, (notice) => notice.student),
    __metadata("design:type", Array)
], Student.prototype, "notice", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Report_1.Report, (report) => report.student),
    __metadata("design:type", Array)
], Student.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Conversation_1.Conversation, (conversation) => conversation.student),
    __metadata("design:type", Array)
], Student.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegularTodo_1.RegularTodo, (regularTodo) => regularTodo.student),
    __metadata("design:type", Array)
], Student.prototype, "regularTodo", void 0);
exports.Student = Student = __decorate([
    (0, typeorm_1.Entity)({ name: 'student' })
], Student);
//# sourceMappingURL=Student.js.map