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
exports.InternJob = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Student_1 = require("./Student");
const status_constant_1 = require("../../common/constants/status.constant");
const Job_1 = require("./Job");
let InternJob = class InternJob extends CodeBase_1.CodeBase {
};
exports.InternJob = InternJob;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InternJob.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], InternJob.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.status.processing }),
    __metadata("design:type", Number)
], InternJob.prototype, "submit_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternJob.prototype, "job_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.status.processing }),
    __metadata("design:type", Number)
], InternJob.prototype, "is_interning", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InternJob.prototype, "student_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longblob', nullable: true }),
    __metadata("design:type", String)
], InternJob.prototype, "appreciation_file", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Job_1.Job, (job) => job.id),
    (0, typeorm_1.JoinColumn)({
        name: 'job_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Job_1.Job)
], InternJob.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Student_1.Student, (student) => student.id),
    (0, typeorm_1.JoinColumn)({
        name: 'student_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Student_1.Student)
], InternJob.prototype, "student", void 0);
exports.InternJob = InternJob = __decorate([
    (0, typeorm_1.Entity)({ name: 'intern_job' })
], InternJob);
//# sourceMappingURL=InternJob.js.map