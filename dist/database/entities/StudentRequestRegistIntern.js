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
exports.StudentRequestRegistIntern = exports.RequestStatus = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Student_1 = require("./Student");
const School_1 = require("./School");
var RequestStatus;
(function (RequestStatus) {
    RequestStatus["WAITTING"] = "WAITTING";
    RequestStatus["REJECTED"] = "REJECTED";
    RequestStatus["SENT"] = "SENT";
})(RequestStatus || (exports.RequestStatus = RequestStatus = {}));
let StudentRequestRegistIntern = class StudentRequestRegistIntern extends CodeBase_1.CodeBase {
};
exports.StudentRequestRegistIntern = StudentRequestRegistIntern;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StudentRequestRegistIntern.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentRequestRegistIntern.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], StudentRequestRegistIntern.prototype, "school_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: RequestStatus, default: RequestStatus.WAITTING }),
    __metadata("design:type", String)
], StudentRequestRegistIntern.prototype, "regist_submit_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 500, nullable: true }),
    __metadata("design:type", String)
], StudentRequestRegistIntern.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], StudentRequestRegistIntern.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => School_1.School, (school) => school.id),
    (0, typeorm_1.JoinColumn)({
        name: 'school_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", School_1.School)
], StudentRequestRegistIntern.prototype, "school", void 0);
exports.StudentRequestRegistIntern = StudentRequestRegistIntern = __decorate([
    (0, typeorm_1.Entity)({ name: 'student_request_regist_intern' })
], StudentRequestRegistIntern);
//# sourceMappingURL=StudentRequestRegistIntern.js.map