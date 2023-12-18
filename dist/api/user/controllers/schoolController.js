"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolController = void 0;
const schoolService_1 = require("../services/schoolService");
const getAcademicYear = async (req, res) => {
    const ss = new schoolService_1.SchoolService();
    const data = await ss.getAcademicYear();
    return res.status(200).json(data);
};
const getSemester = async (req, res) => {
    const ss = new schoolService_1.SchoolService();
    const data = await ss.getSemester();
    return res.status(200).json(data);
};
exports.schoolController = {
    getAcademicYear,
    getSemester,
};
//# sourceMappingURL=schoolController.js.map