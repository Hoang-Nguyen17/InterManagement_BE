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
exports.Job = exports.WorkSpace = exports.WorkType = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Business_1 = require("./Business");
const JobFavorite_1 = require("./JobFavorite");
const Applies_1 = require("./Applies");
const Position_1 = require("./Position");
const JobSkill_1 = require("./JobSkill");
var WorkType;
(function (WorkType) {
    WorkType["PART_TIME"] = "PART_TIME";
    WorkType["FULL_TIME"] = "FULL_TIME";
})(WorkType || (exports.WorkType = WorkType = {}));
var WorkSpace;
(function (WorkSpace) {
    WorkSpace["ONLINE"] = "ONLINE";
    WorkSpace["OFFLINE"] = "OFFLINE";
    WorkSpace["HYBRID"] = "HYBRID";
})(WorkSpace || (exports.WorkSpace = WorkSpace = {}));
let Job = class Job extends CodeBase_1.CodeBase {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 2 }),
    __metadata("design:type", Number)
], Job.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 3, scale: 2, default: null, nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "average_rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Job.prototype, "viewer_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: WorkType, default: WorkType.FULL_TIME }),
    __metadata("design:type", String)
], Job.prototype, "work_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: WorkSpace, default: WorkSpace.OFFLINE }),
    __metadata("design:type", String)
], Job.prototype, "work_space", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Job.prototype, "expire_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "experience_years", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Job.prototype, "job_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Job.prototype, "job_desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], Job.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Job.prototype, "another_information", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "vacancies", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "business_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Job.prototype, "position_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Business_1.Business, (business) => business.id),
    (0, typeorm_1.JoinColumn)({
        name: 'business_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Business_1.Business)
], Job.prototype, "business", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobFavorite_1.JobFavorite, (jobFavorite) => jobFavorite.job),
    __metadata("design:type", Array)
], Job.prototype, "job_favorite", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Applies_1.Applies, (applies) => applies.job),
    __metadata("design:type", Array)
], Job.prototype, "applies", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Position_1.Position, (position) => position.id),
    (0, typeorm_1.JoinColumn)({
        name: 'position_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Position_1.Position)
], Job.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JobSkill_1.JobSkill, (jobSkill) => jobSkill.job),
    __metadata("design:type", Array)
], Job.prototype, "jobSkills", void 0);
__decorate([
    (0, typeorm_1.RelationCount)((job) => job.applies),
    __metadata("design:type", Number)
], Job.prototype, "count_apply", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)({ name: 'job' })
], Job);
//# sourceMappingURL=Job.js.map