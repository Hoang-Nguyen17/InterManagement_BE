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
exports.Conversation = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Teacher_1 = require("./Teacher");
const Student_1 = require("./Student");
const DetailConversation_1 = require("./DetailConversation");
let Conversation = class Conversation extends CodeBase_1.CodeBase {
};
exports.Conversation = Conversation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Conversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Conversation.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Conversation.prototype, "teacher_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'teacher_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], Conversation.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], Conversation.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetailConversation_1.DetailConversation, (detailConversation) => detailConversation.conversation),
    __metadata("design:type", Array)
], Conversation.prototype, "detailConversation", void 0);
exports.Conversation = Conversation = __decorate([
    (0, typeorm_1.Entity)({ name: 'conversation' })
], Conversation);
//# sourceMappingURL=Conversation.js.map