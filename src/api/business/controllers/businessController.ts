import { Request, Response } from "express";
import { BusinessService } from "../services/businessService";
import Joi from "joi";
import { BadRequestException } from "@nestjs/common";
import { filter } from "../interfaces/busnessInterface";

const getBusiness = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            skip: Joi.number().default(0).optional(),
            take: Joi.number().default(10).optional(),
            search: Joi.string().optional(),
        })

        const { error, value } = schema.validate(req.query);
        if (error) return new BadRequestException({ detail: error.message });
        const filter: filter = value;
        const bs = new BusinessService();
        const result = await bs.getBusiness(filter);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getBusinessById = async (req: Request, res: Response) => {
    try {
        const businessId = parseInt(req.params.id);
        const bs = new BusinessService();
        const result = await bs.getBusinessById(businessId);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const upDateBusiness =async (req: Request, res: Response, user) => {
    const schema = Joi.object({
        establish_date: Joi.date().optional(),
        industry_sector: Joi.string().optional(),
        representator: Joi.string().optional(),
        short_desc: Joi.string().optional(),

        // user_person
        full_name: Joi.string().optional(),
        image: Joi.string().optional(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        address: Joi.string().max(100).required(),
        email: Joi.string().email().max(50).required(),
    });

    const { error, value } = schema.validate(req.query);
    if (error) return new BadRequestException({ detail: error.message });

    const bs = new BusinessService();
    // const result = await bs.updateBusiness(value);
}

module.exports = {
    getBusiness,
    getBusinessById,
}