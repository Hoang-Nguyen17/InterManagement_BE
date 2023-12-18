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
exports.RegularTodo = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Teacher_1 = require("./Teacher");
const Student_1 = require("./Student");
const DetailTodo_1 = require("./DetailTodo");
let RegularTodo = class RegularTodo extends CodeBase_1.CodeBase {
};
exports.RegularTodo = RegularTodo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RegularTodo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RegularTodo.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RegularTodo.prototype, "teacher_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Teacher_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({
        name: 'teacher_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Teacher_1.Teacher)
], RegularTodo.prototype, "teacher", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], RegularTodo.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetailTodo_1.DetailTodo, (detailTodo) => detailTodo.regularTodo),
    __metadata("design:type", Array)
], RegularTodo.prototype, "detailTodo", void 0);
exports.RegularTodo = RegularTodo = __decorate([
    (0, typeorm_1.Entity)({ name: 'regular_todo' })
], RegularTodo);
//# sourceMappingURL=RegularTodo.js.map