import { Request, Response } from "express"
import * as Joi from "joi";
import { BusinessService } from "../services/businessService";
import { ApplyService } from "../services/applyService";
import { AppliesStatus } from "../../../database/entities/Applies";
import { RegularTodoService } from "../services/regularTodoService";
import { ConversationService } from "../../chat/services/conversationService";
import { InternJobService } from "../services/internService";
import { InternStatus } from "../../../database/entities/InternJob";

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
    const [items, total] = applies;
    return res.status(200).json({ items, total });
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

    if (apply.apply_status === AppliesStatus.APPROVED) {
        const regularTodoService = new RegularTodoService();
        const regularTodo = regularTodoService.create({
            student_id: result.student_id,
            business_id: business.id,
        })
        await regularTodoService.save(regularTodo);

        // make conversation
        const conversationService = new ConversationService();
        const conversation = conversationService.create({ student_id: result.student_id, business_id: business.id });
        const isExistConversation = conversationService.getOne({ where: conversation });
        if (!isExistConversation) {
            await conversationService.save(conversation);
        }
        const issv = new InternJobService();
        await issv.save({ student_id: result.student_id, apply_id: result.id, is_interning: InternStatus.WAITING });
    }
    return res.status(200).json(result);
}

const finishApply = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const applyId = parseInt(req.params.id);
    const {file_url} = req.body;

    // Duplicate code
    const bs = new BusinessService();
    const internJobService = new InternJobService()

    const business = await bs.getOne({ where: { user_id: id } });
    if (!business) {
        return res.status(400).json('Tài khoản của bạn không phải role doanh nghiệp');
    }
    const applyService = new ApplyService();
    const [apply, internJob] = await Promise.all([applyService.getOne({ where: { id: applyId }, relations: ['job'] }), internJobService.getOne({ where: { apply_id: applyId } })]);
    if (!apply || apply.job.business_id !== business.id) {
        return res.status(400).json('Bạn không có quyền cập nhật');
    } //

    if (apply.apply_status !== AppliesStatus.ONBOARD) {
        return res.status(400).json('Apply chưa được sinh viên xác nhận');
    }

    apply.file_url = file_url;
    apply.apply_status = AppliesStatus.FINISHED;

    internJob.is_interning = InternStatus.FINISHED;
    internJob.finished_date = new Date();

    await Promise.all([internJobService.save(internJob), applyService.save(apply)]);
    return res.status(200).json("Thành công");
}

export const ApplyController = {
  applies,
  updateApply,
  finishApply,
};