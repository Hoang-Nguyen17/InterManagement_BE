import { Request, Response } from "express"
import { UserService } from "../services/userService";
import { makeToken } from "../../../common/helpers/common";
const Joi = require('joi');

const login = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().min(6).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });

        const { username, pass } = value;
        const us = new UserService();
        const {result, schoolId} = await us.login(username, pass);
        if (!result) return res.status(404).json({ detail: 'Đăng nhập thất bại, không tìm thấy tài khoản' });

        delete result.pass;
        const returnData = {
            user: result,
            access_token: makeToken('access', result?.user_person?.id, result?.permission_id, schoolId),
            refresh_token: makeToken('refresh', result.user_person?.id, result?.permission_id, schoolId),
        }
        return res.status(200).json(returnData);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getProfile = async (req: Request, res: Response) => {
    const userData = req.userData;
    const us = new UserService();
    const user = await us.getProfileById(userData.id);
    return res.status(200).json({ user, userData });
}

export const userController = {
    login,
    getProfile,
}