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
exports.Program = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const School_1 = require("./School");
const Student_1 = require("./Student");
let Program = class Program extends CodeBase_1.CodeBase {
};
exports.Program = Program;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Program.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 50 }),
    __metadata("design:type", String)
], Program.prototype, "program_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Program.prototype, "school_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => School_1.School, (school) => school.id),
    (0, typeorm_1.JoinColumn)({
        name: 'school_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", School_1.School)
], Program.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Student_1.Student, (student) => student.program),
    __metadata("design:type", Array)
], Program.prototype, "student", void 0);
exports.Program = Program = __decorate([
    (0, typeorm_1.Entity)({ name: 'program' })
], Program);
//# sourceMappingURL=Program.js.map