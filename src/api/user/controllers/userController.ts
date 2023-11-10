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
        const user = await us.login(username, pass)
        if (!user) return res.status(404).json({ detail: 'Đăng nhập thất bại, không tìm thấy tài khoản' });

        delete user.pass;
        const returnData = {
            user: user,
            access_token: makeToken('access', user?.user_person?.id, user?.permission_id),
            refresh_token: makeToken('refresh', user.user_person?.id, user?.permission_id),
        }
        return res.status(200).json(returnData);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

module.exports = {
    login,
}