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
exports.Notice = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Student_1 = require("./Student");
const Administrator_1 = require("./Administrator");
const DetailNotice_1 = require("./DetailNotice");
let Notice = class Notice extends CodeBase_1.CodeBase {
};
exports.Notice = Notice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Notice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Notice.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Notice.prototype, "admin_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], Notice.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Administrator_1.Administrator, (administrator) => administrator.id),
    (0, typeorm_1.JoinColumn)({
        name: 'admin_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Administrator_1.Administrator)
], Notice.prototype, "administrator", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DetailNotice_1.DetailNotice, (detailNotice) => detailNotice.notice),
    __metadata("design:type", Array)
], Notice.prototype, "detailNotice", void 0);
exports.Notice = Notice = __decorate([
    (0, typeorm_1.Entity)({ name: 'notice' })
], Notice);
//# sourceMappingURL=Notice.js.map