"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentLearnInternController = void 0;
const studentLearnInternSubjectService_1 = require("../services/studentLearnInternSubjectService");
const Joi = require("joi");
const saveStudentLearnInternSubject = (req, res) => {
    try {
        const scheam = Joi.object({});
        const studentLearnInternService = new studentLearnInternSubjectService_1.StudentLearInternService();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getStudentLearnInternSubject = async (req, res) => {
    const studentLearnInternService = new studentLearnInternSubjectService_1.StudentLearInternService();
    const data = await studentLearnInternService.getStudentLearnIntern();
    return res.status(200).json(data);
};
exports.studentLearnInternController = {
    saveStudentLearnInternSubject,
    getStudentLearnInternSubject,
};
//# sourceMappingURL=studentLearnInternSubjectController.js.map