import { Request, Response } from "express"
import * as Joi from "joi";
import { BusinessService } from "../services/businessService";
import { ApplyService } from "../services/applyService";
import { AppliesStatus } from "../../../database/entities/Applies";

const applies = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const schema = Joi.object({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });
    const { page, limit } = value;
    const bs = new BusinessService();
    const business = await bs.getOne({ where: { user_id: id } });
    if (!business) {
        return res.status(400).json('Tài khoản của bạn không phải role doanh nghiệp');
    }
    const applyService = new ApplyService()
    const applies = await applyService.applies(business.id, page, limit);
}

const updateApply = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const applyId = parseInt(req.params.id);
    const bs = new BusinessService();
    const business = await bs.getOne({ where: { user_id: id } });
    if (!business) {
        return res.status(400).json('Tài khoản của bạn không phải role doanh nghiệp');
    }
    const applyService = new ApplyService();
    const apply = await applyService.getOne({ where: { id: applyId }, relations: ['job'] });
    if (!apply || apply.job.business_id !== business.id) {
        return res.status(400).json('Bạn không có quyền cập nhật');
    }

    const schema = Joi.object({
        apply_status: Joi.string().valid(...Object.values(AppliesStatus)).required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });

    apply.apply_status = value.apply_status;
    const result = await applyService.save(apply);
    return res.status(200).json(result);
}
export const ApplyController = {
    applies,
    updateApply,
}