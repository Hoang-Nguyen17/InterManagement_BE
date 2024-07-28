"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentLearnInternController = void 0;
const studentLearnInternSubjectService_1 = require("../services/studentLearnInternSubjectService");
const Joi = require("joi");
const StudentLearnIntern_1 = require("../../../database/entities/StudentLearnIntern");
const typeorm_1 = require("typeorm");
const getStudentLearnInternAll = async (req, res) => {
    const isReport = req.query.is_report === 'true';
    const studentLearnInternService = new studentLearnInternSubjectService_1.StudentLearInternService();
    const data = await studentLearnInternService.getAll({
        relations: [
            'internSubject', 'student', 'student.user_person',
            'student.class', 'student.Intern_job', 'student.Intern_job.apply',
            'internSubject.teacher', 'internSubject.teacher.user_person', 'student.report',
            'student.Intern_job.apply.job', 'internSubject.department', 'student.Intern_job.apply.job.business',
            'student.Intern_job.apply.job.business.user_person'
        ],
        where: { regist_status: StudentLearnIntern_1.RegistStatus.SUCCESSED, student: isReport && { report: { report_file: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) } } }
    });
    return res.status(200).json(data);
};
const getStudentLearnInternSubject = async (req, res) => {
    const { schoolId } = req.userData;
    const schema = Joi.object({
        search_text: Joi.string().optional(),
        semester_id: Joi.number().optional(),
        academic_id: Joi.number().optional(),
        page: Joi.number().default(1).optional(),
        limit: Joi.number().default(20).optional(),
    });
    const { error, value } = schema.validate(req.body);
    if (error)
        return res.status(400).json(error);
    const filter = value;
    const studentLearnInternService = new studentLearnInternSubjectService_1.StudentLearInternService();
    const data = await studentLearnInternService.getStudentLearnIntern(schoolId, filter);
    return res.status(200).json(data);
};
const updateLearnIntern = async (req, res) => {
    const schoolId = req.userData.schoolId;
    const learnInternId = parseInt(req.params.id);
    const schema = Joi.object({
        regist_status: Joi.string().valid(...Object.values(StudentLearnIntern_1.RegistStatus)).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error)
        return res.status(400).json(error);
    const { regist_status } = value;
    const studentLearnInternService = new studentLearnInternSubjectService_1.StudentLearInternService();
    const checkPermisstion = await studentLearnInternService.getOne({
        where: {
            id: learnInternId
        },
        relations: [
            'internSubject',
            'internSubject.department'
        ]
    });
    if (checkPermisstion?.internSubject?.department?.school_id !== schoolId) {
        return res.status(400).json('Bạn không có quyền cập nhật');
    }
    const result = await studentLearnInternService.update({
        id: learnInternId
    }, {
        regist_status: regist_status
    });
    if (!result) {
        return res.status(401).json('Bạn chưa cập nhật được trạng thái đăng ký');
    }
    return res.status(200).json(result);
};
exports.studentLearnInternController = {
    getStudentLearnInternSubject,
    updateLearnIntern,
    getStudentLearnInternAll
};
//# sourceMappingURL=studentLearnInternSubjectController.js.map