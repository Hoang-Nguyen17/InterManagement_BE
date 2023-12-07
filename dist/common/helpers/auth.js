"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const jwt_1 = require("../../config/jwt");
const status_constant_1 = require("../constants/status.constant");
class Auth {
    constructor() {
        this.isLogin = async (accessToken) => {
            let resultData = {};
            resultData.result = false;
            if (accessToken) {
                try {
                    resultData.userData = jwt.verify(accessToken, jwt_1.default.secret);
                    resultData.result = true;
                }
                catch (err) {
                    resultData.result = false;
                }
            }
            return resultData;
        };
        this.auth = async (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization;
                const isLogin = await this.isLogin(token);
                if (isLogin.result) {
                    req['userData'] = isLogin.userData;
                    return next();
                }
                return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
            }
            return res.status(403).json({ detail: 'Unauthorized' });
        };
        this.verifyAuthSchool = async (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization;
                const isLogin = await this.isLogin(token);
                if (isLogin.result) {
                    const schoolId = parseInt(req.params.id);
                    if (schoolId !== isLogin.userData?.schoolId)
                        return res.status(400).json({ detail: 'bạn không có quyền truy cập' });
                    req['userData'] = isLogin.userData;
                    return next();
                }
                return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
            }
            return res.status(403).json({ detail: 'Unauthorized' });
        };
        this.authAdmin = async (req, res, next) => {
            if (req.headers.authorization) {
                const token = req.headers.authorization;
                const isLogin = await this.isLogin(token);
                if (isLogin.result && isLogin.userData.userType == status_constant_1.role.admin) {
                    req['userData'] = isLogin.userData;
                    return next();
                }
                ;
                return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
            }
            return res.status(403).json({ detail: 'Unauthorized' });
        };
        this.verifyAdminSchool = async (req, res, next) => {
            try {
                if (req.headers.authorization) {
                    const token = req.headers.authorization;
                    const isLogin = await this.isLogin(token);
                    const schoolId = parseInt(req.params.id);
                    if (!schoolId)
                        return res.status(403).json({ detail: 'thiếu schoolId' });
                    if (isLogin.result && isLogin.userData.userType == status_constant_1.role.admin) {
                        const schoolId = parseInt(req.params.id);
                        if (schoolId !== isLogin.userData.schoolId)
                            return res.status(400).json({ detail: 'bạn không có quyền truy cập' });
                        req['userData'] = isLogin.userData;
                        return next();
                    }
                    ;
                    return res.status(403).json({ detail: 'Token không hợp lệ hoặc hết hạn, vui lòng đăng nhập lại' });
                }
                return res.status(403).json({ detail: 'Unauthorized' });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        };
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map