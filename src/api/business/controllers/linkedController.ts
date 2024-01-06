

import { Request, Response } from "express";
import * as Joi from "joi";
import { BusinessService } from "../services/businessService";
import { LinkedStatus } from "../../../database/entities/SchoolLinkedBusiness";
import { ManageAppService } from "../../admin/services/manageAppService";

const schoolLinked = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: id } });
        if (!business) {
            return res.status(400).json('Business not found');
        }
        const schema = Joi.object({
            status: Joi.string().valid(...Object.values(LinkedStatus)).optional(),
            limit: Joi.number().default(10),
            page: Joi.number().default(1),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const msv = new ManageAppService()
        const linkedSchool = await msv.getLinkedSchoolByBusinessId(
            business.id,
            value.status,
            value.page,
            value.limit,
        )
        return res.status(200).json(linkedSchool);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const updateLinked = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const linkId = parseInt(req.params.id);
        const bs = new BusinessService();
        const business = await bs.getOne({ where: { user_id: id } });
        if (!business) {
            return res.status(400).json('Business not found');
        }
        const schema = Joi.object({
            status: Joi.string().valid(...Object.values(LinkedStatus)).default(LinkedStatus.APPROVED),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const msv = new ManageAppService()
        const linked = await msv.getOneLinked({
            where: {
                business_id: business.id,
                id: linkId,
            }
        })
        if (!linked) return res.status(400).json('Linked not found');
        linked.is_linked = value.status;
        const result = await msv.saveLinked(linked);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}
export const linkedController = {
    schoolLinked,
    updateLinked,
}