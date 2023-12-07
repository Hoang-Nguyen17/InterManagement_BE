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
exports.TodoAppreciation = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const DetailTodo_1 = require("./DetailTodo");
let TodoAppreciation = class TodoAppreciation extends CodeBase_1.CodeBase {
};
exports.TodoAppreciation = TodoAppreciation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TodoAppreciation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'mediumtext' }),
    __metadata("design:type", String)
], TodoAppreciation.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TodoAppreciation.prototype, "todo_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => DetailTodo_1.DetailTodo, (detailTodo) => detailTodo.id),
    (0, typeorm_1.JoinColumn)({
        name: 'todo_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", DetailTodo_1.DetailTodo)
], TodoAppreciation.prototype, "detailTodo", void 0);
exports.TodoAppreciation = TodoAppreciation = __decorate([
    (0, typeorm_1.Entity)({ name: 'todo_appreciation' })
], TodoAppreciation);
//# sourceMappingURL=TodoAppreciation.js.map