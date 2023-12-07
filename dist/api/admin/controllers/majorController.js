"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.majorController = void 0;
const majorService_1 = require("../services/majorService");
const getMajors = (req, res) => {
    try {
        const majorService = new majorService_1.MajorService();
        const data = majorService.getMajors();
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
exports.majorController = {
    getMajors,
};
//# sourceMappingURL=majorController.js.map