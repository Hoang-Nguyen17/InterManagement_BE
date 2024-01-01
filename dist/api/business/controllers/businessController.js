"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessController = void 0;
const businessService_1 = require("../services/businessService");
const Joi = require("joi");
const common_1 = require("@nestjs/common");
const getBusiness = async (req, res) => {
    try {
        const schema = Joi.object({
            skip: Joi.number().default(0).optional(),
            take: Joi.number().default(10).optional(),
            search: Joi.string().optional(),
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
    const schema = Joi.object({
        establish_date: Joi.date().optional(),
        industry_sector: Joi.string().optional(),
        representator: Joi.string().optional(),
        short_desc: Joi.string().optional(),
        full_name: Joi.string().optional(),
        image: Joi.string().optional(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        address: Joi.string().max(100).required(),
        email: Joi.string().email().max(50).required(),
    });
    const { error, value } = schema.validate(req.query);
    if (error)
        return new common_1.BadRequestException({ detail: error.message });
    const bs = new businessService_1.BusinessService();
};
exports.businessController = {
    getBusiness,
    getBusinessById,
};
//# sourceMappingURL=businessController.js.map