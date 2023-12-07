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
exports.DetailConversation = void 0;
const typeorm_1 = require("typeorm");
const CodeBase_1 = require("./CodeBase");
const Conversation_1 = require("./Conversation");
const UserPerson_1 = require("./UserPerson");
let DetailConversation = class DetailConversation extends CodeBase_1.CodeBase {
};
exports.DetailConversation = DetailConversation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetailConversation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'nvarchar', length: 500 }),
    __metadata("design:type", String)
], DetailConversation.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longblob', nullable: true }),
    __metadata("design:type", String)
], DetailConversation.prototype, "attach_file", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailConversation.prototype, "conversation_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailConversation.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversation_1.Conversation, (conversation) => conversation.id),
    (0, typeorm_1.JoinColumn)({
        name: 'conversation_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", Conversation_1.Conversation)
], DetailConversation.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserPerson_1.UserPerson, (userPerson) => userPerson.id),
    (0, typeorm_1.JoinColumn)({
        name: 'user_id',
        referencedColumnName: 'id'
    }),
    __metadata("design:type", UserPerson_1.UserPerson)
], DetailConversation.prototype, "userPerson", void 0);
exports.DetailConversation = DetailConversation = __decorate([
    (0, typeorm_1.Entity)({ name: 'detail_conversation' })
], DetailConversation);
//# sourceMappingURL=DetailConversation.js.map