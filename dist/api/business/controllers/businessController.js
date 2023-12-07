"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const businessService_1 = require("../services/businessService");
const joi_1 = require("joi");
const common_1 = require("@nestjs/common");
const getBusiness = async (req, res) => {
    try {
        const schema = joi_1.default.object({
            skip: joi_1.default.number().default(0).optional(),
            take: joi_1.default.number().default(10).optional(),
            search: joi_1.default.string().optional(),
        });
        const { error, value } = schema.validate(req.query);
        if (error)
            return new common_1.BadRequestException({ detail: error.message });
        const filter = value;
        const bs = new businessService_1.BusinessService();
        const result = await bs.getBusiness(filter);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getBusinessById = async (req, res) => {
    try {
        const businessId = parseInt(req.params.id);
        const bs = new businessService_1.BusinessService();
        const result = await bs.getBusinessById(businessId);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const upDateBusiness = async (req, res, user) => {
    const schema = joi_1.default.object({
        establish_date: joi_1.default.date().optional(),
        industry_sector: joi_1.default.string().optional(),
        representator: joi_1.default.string().optional(),
        short_desc: joi_1.default.string().optional(),
        full_name: joi_1.default.string().optional(),
        image: joi_1.default.string().optional(),
        phone: joi_1.default.string().pattern(/^[0-9]{10}$/).required(),
        address: joi_1.default.string().max(100).required(),
        email: joi_1.default.string().email().max(50).required(),
    });
    const { error, value } = schema.validate(req.query);
    if (error)
        return new common_1.BadRequestException({ detail: error.message });
    const bs = new businessService_1.BusinessService();
};
module.exports = {
    getBusiness,
    getBusinessById,
};
//# sourceMappingURL=businessController.js.map