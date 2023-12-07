"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
const common_1 = require("../../../common/helpers/common");
const Joi = require('joi');
const login = async (req, res) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().min(6).required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json({ detail: error.message });
        const { username, pass } = value;
        const us = new userService_1.UserService();
        const { result, schoolId } = await us.login(username, pass);
        if (!result)
            return res.status(404).json({ detail: 'Đăng nhập thất bại, không tìm thấy tài khoản' });
        delete result.pass;
        const returnData = {
            user: result,
            access_token: (0, common_1.makeToken)('access', result?.user_person?.id, result?.permission_id, schoolId),
            refresh_token: (0, common_1.makeToken)('refresh', result.user_person?.id, result?.permission_id, schoolId),
        };
        return res.status(200).json(returnData);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getProfile = async (req, res) => {
    const userData = req.userData;
    const us = new userService_1.UserService();
    const user = await us.getProfileById(userData.id);
    return res.status(200).json({ user, userData });
};
exports.userController = {
    login,
    getProfile,
};
//# sourceMappingURL=userController.js.map