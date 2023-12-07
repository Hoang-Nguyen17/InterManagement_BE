"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = exports.statusFinished = exports.status = exports.studyingStatus = exports.accountStatus = exports.TeachingStatus = void 0;
var TeachingStatus;
(function (TeachingStatus) {
    TeachingStatus[TeachingStatus["retire"] = 0] = "retire";
    TeachingStatus[TeachingStatus["teaching"] = 1] = "teaching";
    TeachingStatus[TeachingStatus["pause"] = 2] = "pause";
    TeachingStatus[TeachingStatus["quit_job"] = 3] = "quit_job";
})(TeachingStatus || (exports.TeachingStatus = TeachingStatus = {}));
var accountStatus;
(function (accountStatus) {
    accountStatus[accountStatus["disabled"] = 0] = "disabled";
    accountStatus[accountStatus["Enabled"] = 1] = "Enabled";
})(accountStatus || (exports.accountStatus = accountStatus = {}));
var studyingStatus;
(function (studyingStatus) {
    studyingStatus[studyingStatus["suspension"] = 0] = "suspension";
    studyingStatus[studyingStatus["studying"] = 1] = "studying";
    studyingStatus[studyingStatus["deferral"] = 2] = "deferral";
    studyingStatus[studyingStatus["graduate"] = 3] = "graduate";
})(studyingStatus || (exports.studyingStatus = studyingStatus = {}));
var status;
(function (status) {
    status[status["failed"] = 0] = "failed";
    status[status["finished"] = 1] = "finished";
    status[status["processing"] = 2] = "processing";
})(status || (exports.status = status = {}));
var statusFinished;
(function (statusFinished) {
    statusFinished[statusFinished["outOfExpire"] = 0] = "outOfExpire";
    statusFinished[statusFinished["onTime"] = 1] = "onTime";
})(statusFinished || (exports.statusFinished = statusFinished = {}));
var role;
(function (role) {
    role[role["admin"] = 1] = "admin";
    role[role["teacher"] = 2] = "teacher";
    role[role["student"] = 3] = "student";
    role[role["business"] = 4] = "business";
})(role || (exports.role = role = {}));
//# sourceMappingURL=status.constant.js.map