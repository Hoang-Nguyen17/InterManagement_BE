import * as Joi from "joi";
import { MessageService } from "../services/messageService";

const sendMessage = async (socket, io) => {
    try {
        socket.on("sendDataClient", async (data) => {
            const schema = Joi.object({
                content: Joi.string().required(),
                attach_file: Joi.string().optional(),
                conversation_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
            const { error, value } = schema.validate(data);
            console.log(error);
            const messageService = new MessageService();
            await messageService.save(value);
            io.emit("sendDataServer", { data });
        });
    } catch (error) {
        console.log(error);
    }
}

export const chatController = {
    sendMessage,
}