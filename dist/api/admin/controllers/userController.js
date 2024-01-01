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
        const schoolId = req.userData.schoolId;
        const schema = Joi.array()
            .items(Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().min(6).required(),
            permission_id: Joi.number()
                .valid(...Object.values(status_constant_1.role))
                .default(status_constant_1.role.student)
                .required(),
            user_person: Joi.when("permission_id", {
                is: 2,
                then: Joi.object({
                    email: Joi.string().email().max(50).required(),
                    full_name: Joi.string().required(),
                    phone: Joi.string()
                        .pattern(/^[0-9]{10}$/)
                        .required(),
                    address: Joi.string().max(100).required(),
                    image: Joi.string().optional(),
                    teacher: Joi.object({
                        dob: Joi.date().required(),
                        start_date: Joi.date().required(),
                        education_level: Joi.string().required(),
                        experience_year: Joi.number().required(),
                        current_status: Joi.number()
                            .valid(...Object.values(status_constant_1.TeachingStatus))
                            .default(status_constant_1.TeachingStatus.teaching),
                        department_id: Joi.number().required(),
                    }).required(),
                }),
            }).required(),
            otherwise: Joi.object({
                email: Joi.string().email().max(50).required(),
                full_name: Joi.string().required(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
                address: Joi.string().max(100).required(),
                image: Joi.string().optional(),
                student: Joi.object({
                    dob: Joi.date().required(),
                    admission_date: Joi.date().required(),
                    sex: Joi.number()
                        .valid(...Object.values(gender_constant_1.gender))
                        .default(gender_constant_1.gender.men)
                        .required(),
                    current_status: Joi.number()
                        .valid(...Object.values(status_constant_1.studyingStatus))
                        .default(status_constant_1.studyingStatus.studying)
                        .required(),
                    program_id: Joi.number().required(),
                    major_id: Joi.number().required(),
                    class_id: Joi.number().required(),
                }).required(),
            }),
        }).required())
            .required();
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ detail: error.message });
        const us = new userService_1.UserService();
        const accountInfo = await value.reduce(async (accountArrayPromise, account) => {
            const accountArray = await accountArrayPromise;
            const isValidAccount = await us.isValidAccount(account, schoolId);
            if (isValidAccount) {
                accountArray.successes.push(account);
            }
            else {
                accountArray.failures.push(account);
            }
            return accountArray;
        }, Promise.resolve({ successes: [], failures: [] }));
        if (!accountInfo.successes.length)
            return res.status(400).json({ detail: 'danh sách tài khoản không hợp lệ', account_failures: accountInfo.failures });
        accountInfo.successes.map(async (account) => {
            const userAccount = { username: account.username, permission_id: account.permission_id, pass: (0, common_1.hashPass)(account.pass) };
            await us.saveAccount(userAccount);
            const person = {
                ...account.user_person,
                username: account.username,
            };
            const userPerson = await us.saveUserPerson(person);
            switch (account.permission_id) {
                case status_constant_1.role.teacher:
                    const teacher = {
                        ...account.user_person.teacher,
                        user_id: userPerson.id,
                    };
                    await us.saveTeacher(teacher);
                    break;
                case status_constant_1.role.student:
                    const student = {
                        ...account.user_person.student,
                        user_id: userPerson.id,
                    };
                    await us.saveStudent(student);
                    break;
            }
        });
        return res.status(200).json({ listAccountFailed: accountInfo.failures });
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
            status: Joi.number()
                .valid(...Object.values(status_constant_1.TeachingStatus))
                .optional(),
            searchText: Joi.string().optional(),
            departmentId: Joi.number().optional(),
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return res.status(400).json(error);
        const filter = { ...value, schoolId };
        const us = new userService_1.UserService();
        const data = await us.getTeachers(filter);
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
            status: Joi.number()
                .valid(...Object.values(status_constant_1.studyingStatus))
                .optional(),
            searchText: Joi.string().optional(),
            departmentId: Joi.number().optional(),
            classId: Joi.number().optional(),
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return res.status(400).json(error);
        const filter = { ...value, schoolId };
        const us = new userService_1.UserService();
        const data = await us.getStudents(filter);
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