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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Business_1 = require("./Business");
const skill_1 = require("./skill");
const InternJob_1 = require("./InternJob");
const JobFavorite_1 = require("./JobFavorite");
const StudentRequestRegistIntern_1 = require("./StudentRequestRegistIntern");
let Job = class Job extends CodeBase_1.CodeBase {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", String)
], Job.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Job.prototype, "job_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Job.prototype, "job_desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Job.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Job.prototype, "another_information", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "vacancies", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "business_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Business_1.Business, (business) => business.id),
    (0, typeorm_1.JoinColumn)({
        name: 'business_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Business_1.Business)
], Job.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => skill_1.Skill, (skill) => skill.job),
    __metadata("design:type", Array)
], Job.prototype, "skill", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InternJob_1.InternJob, (internJob) => internJob.job),
    __metadata("design:type", Array)
], Job.prototype, "intern_job", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobFavorite_1.JobFavorite, (jobFavorite) => jobFavorite.job),
    __metadata("design:type", Array)
], Job.prototype, "job_favorite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => StudentRequestRegistIntern_1.StudentRequestRegistIntern, (studentRequestRegistIntern) => studentRequestRegistIntern.job),
    __metadata("design:type", Array)
], Job.prototype, "studentRequestRegistIntern", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)({ name: 'job' })
], Job);
//# sourceMappingURL=Job.js.map