"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internSubjectController = void 0;
const Joi = require("joi");
const InternSubject_1 = require("../../../database/entities/InternSubject");
const schoolService_1 = require("../services/schoolService");
const subject_error_1 = require("../../../common/error/subject.error");
const internSubjectService_1 = require("../services/internSubjectService");
const userService_1 = require("../services/userService");
const schoolService_2 = require("../../user/services/schoolService");
const saveInternSubject = async (req, res) => {
    try {
        const schoolId = parseInt(req.params.id);
        const departmentId = parseInt(req.params.did);
        const schema = Joi.object({
            id: Joi.number().optional(),
            name: Joi.string().required(),
            unit: Joi.number().required(),
            sessions: Joi.number().required(),
            max_students: Joi.number().required(),
            teacher_id: Joi.number().required(),
            academic_year: Joi.number().required(),
            semester_id: Joi.number().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().greater(Joi.ref('start_date')).required()
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ detail: error.message });
        let internSubject = new InternSubject_1.InternSubject();
        const us = new userService_1.UserService();
        const ss = new schoolService_1.SchoolService();
        const uss = new schoolService_2.SchoolService();
        const internalSubjectService = new internSubjectService_1.InternSubjectService();
        const [department, teacher, academicYear, semester] = await Promise.all([
            ss.getDepartment(schoolId, departmentId),
            us.getOneTeacher({ where: { id: value.teacher_id } }),
            uss.getOneAcademicYear({ where: { id: value.academic_year } }),
            uss.getOneSemester({ where: { id: value.semester_id } }),
        ]);
        if (!(department && teacher && academicYear && semester))
            return res.status(400).json('Bad Request (department, teacher, semester or academic year is wrong!)');
        if (value.id) {
            internSubject = await internalSubjectService.getOne({ where: { id: value.id, department_id: value.department_id } });
            if (!internSubject)
                return res.status(400).json('internalSubject not found');
        }
        Object.assign(internSubject, { ...value, department, teacher, academicYear, semester });
        const result = await internalSubjectService.saveInternSubject(internSubject);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getInternSubjects = async (req, res) => {
    try {
        const schema = Joi.object({
            academic_year: Joi.number().optional(),
            semester_id: Joi.number().optional(),
            department_id: Joi.number().optional(),
            search: Joi.string().optional(),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return res.status(400).json(error);
        const internalSubjectService = new internSubjectService_1.InternSubjectService();
        const filter = value;
        const data = await internalSubjectService.getInternSubjects(filter);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const deleteInternSubjects = async (req, res) => {
    try {
        const scheam = Joi.object({
            ids: Joi.array().items(Joi.number().required()).required(),
        });
        const schoolId = req.userData.schoolId;
        const { error, value } = scheam.validate(req.body);
        if (error)
            return res.status(400).json({ detail: error.message });
        const internalSubjectService = new internSubjectService_1.InternSubjectService();
        const result = await internalSubjectService.deleteInternSubjects(value.ids, schoolId);
        if (!result.length)
            return res.status(404).json({ detail: subject_error_1.ERROR_SUBJECT.NOT_FOUND });
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
exports.internSubjectController = {
    saveInternSubject,
    getInternSubjects,
    deleteInternSubjects,
};
//# sourceMappingURL=internSubjectController.js.map