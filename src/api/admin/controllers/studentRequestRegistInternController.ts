import { Request, Response } from "express"
import * as Joi from "joi";
import { StudentRequestRegistInternService } from "../../admin/services/StudentRequestRegisInternService";
import { RequestStatus } from "../../../database/entities/StudentRequestRegistIntern";

const requestRegisInterns = async (req: Request, res: Response) => {
    const { schoolId } = req.userData;
    const schema = Joi.object({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    })

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });
    const { page, limit } = value;
    
    const sv = new StudentRequestRegistInternService();
    const data = await sv.requests(schoolId, page, limit);
    return res.status(200).json(data);
}

const updateRequest = async (req: Request, res: Response) => {
    const { schoolId } = req.userData;
    const requestId = parseInt(req.params.id);

    const schema = Joi.object({
        file: Joi.string().max(500).optional(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });

    const sv = new StudentRequestRegistInternService();
    const request = await sv.getOne({ where: { id: requestId, school_id: schoolId } });
    if (!request) {
        return res.status(400).json('Không tồn tại request');
    }
    if (!value.file) {
        request.regist_submit_status = RequestStatus.REJECTED;
    } else {
        request.regist_submit_status = RequestStatus.SENT;
    }

    const result = await sv.save(request);
    return res.status(200).json(result);
}

export const StudentRequestRegistIntern = {
    requestRegisInterns,
    updateRequest,
}