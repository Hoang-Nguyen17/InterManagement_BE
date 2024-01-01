import { Request, Response } from "express"
import * as Joi from "joi";
import { BusinessService } from "../../business/services/businessService";
import { ConversationService } from "../services/conversationService";

const conversations = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const businessService = new BusinessService();
        const business = await businessService.getOne({ where: { id: id } });
        if (!business) {
            return res.status(400).json('Tài khoản này không phải business');
        }

        const conversationService = new ConversationService();
        const data = await conversationService.conversations(business.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}

const getConversationDetail = async (req: Request, res: Response) => {
    try {
        const conversationId = parseInt(req.params.id);
        const id = req.userData.id;
        const businessService = new BusinessService();
        const business = await businessService.getOne({ where: { id: id } });
        if (!business) {
            return res.status(400).json('Tài khoản này không phải business');
        }
        const conversationService = new ConversationService();
        const data = await conversationService.getOne({
            where: {
                id: conversationId,
                business_id: business.id
            },
            relations: [
                'student',
                'student.user_person',
                'detailConversation',
            ]
        });
        if (!data) {
            return res.status(400).json('Không tìm thấy conversation');
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}
export const conversationBusinessController = {
    conversations,
    getConversationDetail,
}