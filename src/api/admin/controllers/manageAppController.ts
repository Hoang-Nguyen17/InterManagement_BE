import { Request, Response } from "express";
import Joi from "joi";
import { School } from "../../../database/entities/School";
import { ManageAppService } from "../services/manageAppService";
import { FilterBusiness } from "../interfaces/business.interface";

const saveSchool = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            id: Joi.number().optional(),
            school_name: Joi.string().max(50).required(),
            shorthand_name: Joi.string().max(20).required(),
            establish_date: Joi.date().required(),
            study_field: Joi.string().max(50).required(),
            avatar: Joi.string().max(150),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService()
        const school = ms.createSchool(value);
        if (school.id) {
            const oldSchool = ms.getOneSchool({ where: { id: school.id } });
            if (!oldSchool) return res.status(400).json('Trường không tồn tại');
        }

        const result = await ms.saveSchool(school);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const deleteSchool = async (req: Request, res: Response) => {
    try {
        const schema = Joi.array().items(
            Joi.number().required(),
        ).required();

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService();
        const result = await ms.softDeleteSchools(value);
        if (!result.affected) return res.status(400).json('Trường không tồn tại');
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const businesses = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            search_text: Joi.string().optional(),
            page: Joi.number().min(1).default(1).optional(),
            limit: Joi.number().default(10).optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FilterBusiness = value;
        const ms = new ManageAppService();
        const result = await ms.bussnesses(filter);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const saveBusiness = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            full_name: Joi.string().max(75).required(),
            image: Joi.string().max(150).optional(),
            phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
            email: Joi.string().email().required(),
            address: Joi.string().max(100).required(),
            business: Joi.object({
                establish_date: Joi.date().required(),
                industry_sector: Joi.string().max(50).required(),
                representator: Joi.string().max(50).required(),
                short_desc: Joi.string().max(400).optional(),
            })
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        return res.status(200).json();
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}


export const manageAppController = {
    saveSchool,
    deleteSchool,

    businesses,
    saveBusiness,
}