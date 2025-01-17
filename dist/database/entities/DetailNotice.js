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
exports.DetailNotice = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Notice_1 = require("./Notice");
let DetailNotice = class DetailNotice extends CodeBase_1.CodeBase {
};
exports.DetailNotice = DetailNotice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetailNotice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 200 }),
    __metadata("design:type", String)
], DetailNotice.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailNotice.prototype, "notice_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Notice_1.Notice, (notice) => notice.id),
    (0, typeorm_1.JoinColumn)({
        name: 'notice_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Notice_1.Notice)
], DetailNotice.prototype, "notice", void 0);
exports.DetailNotice = DetailNotice = __decorate([
    (0, typeorm_1.Entity)({ name: 'detail_notice' })
], DetailNotice);
//# sourceMappingURL=DetailNotice.js.map