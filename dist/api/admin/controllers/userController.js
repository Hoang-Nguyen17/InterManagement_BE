"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const status_constant_1 = require("../../../common/constants/status.constant");
const gender_constant_1 = require("../../../common/constants/gender.constant");
const common_1 = require("../../../common/helpers/common");
const userService_1 = require("../services/userService");
const Joi = require("joi");
const register = async (req, res) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().min(6).required(),
            permission_id: Joi.number().valid(...Object.values(status_constant_1.role)).default(status_constant_1.role.student).required(),
            email: Joi.string().email().max(50).required(),
            full_name: Joi.string().required(),
            phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
            address: Joi.string().max(100).required(),
            image: Joi.string().optional(),
            teacher: Joi.when('permission_id', {
                is: 2,
                then: Joi.object({
                    dob: Joi.date().required(),
                    start_date: Joi.date().required(),
                    education_level: Joi.string().required(),
                    experience_year: Joi.number().required(),
                    current_status: Joi.number().valid(...Object.values(status_constant_1.TeachingStatus)).default(status_constant_1.TeachingStatus.teaching),
                    department_id: Joi.number().required(),
                }).required(),
                otherwise: Joi.forbidden()
            }),
            student: Joi.when('permission_id', {
                is: 3,
                then: Joi.object({
                    dob: Joi.date().required(),
                    admission_date: Joi.date().required(),
                    sex: Joi.number().valid(...Object.values(gender_constant_1.gender)).default(gender_constant_1.gender.men).required(),
                    current_status: Joi.number().valid(...Object.values(status_constant_1.studyingStatus)).default(status_constant_1.studyingStatus.studying).required(),
                    program_id: Joi.number().required(),
                    major_id: Joi.number().required(),
                    class_id: Joi.number().required(),
                }).required(),
                otherwise: Joi.forbidden()
            }),
            business: Joi.when('permission_id', {
                is: 4,
                then: Joi.object({
                    short_desc: Joi.string().optional(),
                    representator: Joi.string().required(),
                    industry_sector: Joi.string().required(),
                    establish_date: Joi.date().required(),
                }).required(),
                otherwise: Joi.forbidden()
            }),
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ detail: error.message });
        const userAccount = {
            username: value.username,
            pass: (0, common_1.hashPass)(value.pass),
            permission_id: value.permission_id,
            token: null,
        };
        const userPerson = {
            id: null,
            image: value.image,
            username: value.username,
            email: value.email,
            full_name: value.full_name,
            phone: value.phone,
            address: value.address,
        };
        const us = new userService_1.UserService();
        const isExistsEmail = await us.isExistsEmail(value.email);
        if (isExistsEmail)
            return res.status(400).json({ detail: 'email đã tồn tại' });
        const user_account = await us.saveUser(userAccount, userPerson);
        if (!user_account)
            return res.status(403).json({ detail: 'Tạo tài khoản không thành công' });
        switch (value.permission_id) {
            case status_constant_1.role.teacher:
                const teacher = {
                    user_id: user_account?.user_person?.id,
                    ...value.teacher
                };
                user_account.user_person.teacher = await us.saveTeacher(teacher);
                break;
            case status_constant_1.role.student:
                const student = {
                    user_id: user_account?.user_person?.id,
                    ...value.student
                };
                user_account.user_person.student = await us.saveStudent(student);
                break;
            case status_constant_1.role.business:
                const business = {
                    user_id: user_account?.user_person?.id,
                    ...value.business
                };
                user_account.user_person.business = await us.saveBusiness(business);
                break;
            default:
                break;
        }
        return res.status(200).json({
            user_person: user_account,
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getAdministrators = async (req, res) => {
    try {
        const schoolId = req.userData.schoolId;
        const us = new userService_1.UserService();
        const data = await us.getAdministrator(schoolId);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
const getTeachers = async (req, res) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return res.status(400).json(error);
        const us = new userService_1.UserService();
        const data = await us.getTeachers(schoolId, value.page, value.limit);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
const getStudents = async (req, res) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.object({
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return res.status(400).json(error);
        const us = new userService_1.UserService();
        const data = await us.getStudents(schoolId, value.page, value.limit);
        return res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};
exports.userController = {
    register,
    getAdministrators,
    getTeachers,
    getStudents,
};
//# sourceMappingURL=userController.js.map