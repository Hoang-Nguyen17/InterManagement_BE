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
exports.Teacher = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const status_constant_1 = require("../../common/constants/status.constant");
const UserPerson_1 = require("./UserPerson");
const Department_1 = require("./Department");
const Class_1 = require("./Class");
const InternSubject_1 = require("./InternSubject");
const ExaminationBoard_1 = require("./ExaminationBoard");
const Conversation_1 = require("./Conversation");
const RegularTodo_1 = require("./RegularTodo");
let Teacher = class Teacher extends CodeBase_1.CodeBase {
};
exports.Teacher = Teacher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Teacher.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Teacher.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Teacher.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 30 }),
    __metadata("design:type", String)
], Teacher.prototype, "education_level", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Teacher.prototype, "experience_year", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.TeachingStatus.teaching }),
    __metadata("design:type", Number)
], Teacher.prototype, "current_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Teacher.prototype, "department_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Department_1.Department, (department) => department.id),
    (0, typeorm_1.JoinColumn)({
        name: 'department_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Department_1.Department)
], Teacher.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], Teacher.prototype, "user_person", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Class_1.Class, (Class) => Class.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "class", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InternSubject_1.InternSubject, (internSubject) => internSubject.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "intern_subject", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.President),
    __metadata("design:type", Array)
], Teacher.prototype, "examinationBoardPresident", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.Secretary),
    __metadata("design:type", Array)
], Teacher.prototype, "examinationBoardSecretary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExaminationBoard_1.ExaminationBoard, (examinationBoard) => examinationBoard.Asker),
    __metadata("design:type", Array)
], Teacher.prototype, "examinationBoardAsker", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Conversation_1.Conversation, (conversation) => conversation.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RegularTodo_1.RegularTodo, (regularTodo) => regularTodo.teacher),
    __metadata("design:type", Array)
], Teacher.prototype, "regularTodo", void 0);
exports.Teacher = Teacher = __decorate([
    (0, typeorm_1.Entity)({ name: 'teacher' })
], Teacher);
//# sourceMappingURL=Teacher.js.map