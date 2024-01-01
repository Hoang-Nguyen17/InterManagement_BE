import { Request, Response } from "express"
import * as Joi from "joi";
import { ConversationService } from "../services/conversationService";
import { UserService } from "../../admin/services/userService";

const conversations = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });
        if (!student) {
            return res.status(400).json('Tài khoản này không phải student');
        }

        const conversationService = new ConversationService();
        const data = await conversationService.conversations(null, student.id);
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
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });
        if (!student) {
            return res.status(400).json('Tài khoản này không phải student');
        }
        const conversationService = new ConversationService();
        const data = await conversationService.getOne({
            where: {
                id: conversationId,
                student_id: student.id
            },
            relations: [
                'business',
                'business.user_person',
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
export const conversationStudentController = {
    conversations,
    getConversationDetail,
}