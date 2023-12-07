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
exports.DetailTodo = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const status_constant_1 = require("../../common/constants/status.constant");
const RegularTodo_1 = require("./RegularTodo");
const TodoAppreciation_1 = require("./TodoAppreciation");
let DetailTodo = class DetailTodo extends CodeBase_1.CodeBase {
};
exports.DetailTodo = DetailTodo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetailTodo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 200 }),
    __metadata("design:type", String)
], DetailTodo.prototype, "todo_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DetailTodo.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DetailTodo.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: status_constant_1.status.processing }),
    __metadata("design:type", Number)
], DetailTodo.prototype, "completed_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null, nullable: true }),
    __metadata("design:type", Number)
], DetailTodo.prototype, "out_of_expire", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailTodo.prototype, "regular_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RegularTodo_1.RegularTodo, (regularTodo) => regularTodo.id),
    (0, typeorm_1.JoinColumn)({
        name: 'regular_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", RegularTodo_1.RegularTodo)
], DetailTodo.prototype, "regularTodo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TodoAppreciation_1.TodoAppreciation, (todoAppreciation) => todoAppreciation.detailTodo),
    __metadata("design:type", Array)
], DetailTodo.prototype, "todoAppreciation", void 0);
exports.DetailTodo = DetailTodo = __decorate([
    (0, typeorm_1.Entity)({ name: 'detail_todo' })
], DetailTodo);
//# sourceMappingURL=DetailTodo.js.map