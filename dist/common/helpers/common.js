"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeToken = exports.hashPass = void 0;
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwt_1 = require("../../config/jwt");
const hashPass = (pass) => {
    let hash = crypto.createHash('sha256');
    return hash.update(pass).digest('hex');
};
exports.hashPass = hashPass;
const makeToken = (tokenType, id, userType, schoolId = null) => {
    let expiresIn = '24h';
    if (tokenType == 'refresh') {
        expiresIn = '30 days';
    }
    let token = jwt.sign({
        id: id,
        userType: userType,
        schoolId: schoolId,
    }, jwt_1.default.secret, { expiresIn: expiresIn });
    return token;
};
exports.makeToken = makeToken;
//# sourceMappingURL=common.js.map