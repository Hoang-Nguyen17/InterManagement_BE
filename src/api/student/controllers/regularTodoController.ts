import { Request, Response } from "express";
import * as Joi from "joi";
import { UserService } from "../../admin/services/userService";
import { RegularTodoService } from "../../business/services/regularTodoService";
import { CompletedStatus } from "../../../database/entities/DetailTodo";
import { DetailTodoService } from "../../business/services/detailTodoService";

const getRegularTododetail = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });
        if (!student) {
            return res.status(400).json('Tài khoản này không phải student');
        }
        const regularTodoService = new RegularTodoService();
        const data = await regularTodoService.getOne({
            where: {
                student_id: student.id
            },
            relations: [
                'detailTodo',
                'detailTodo.todoAppreciation',
                'business',
                'business.user_person',
            ]
        });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}

const updateDetailTodo = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const detailTodoId = parseInt(req.params.id);
        const userService = new UserService();
        const student = await userService.getOneStudent({ where: { user_id: id } });
        if (!student) {
            return res.status(400).json('Tài khoản này không phải student');
        }
        const detailTodoService = new DetailTodoService();
        const todo = await detailTodoService.getOne({ where: { id: detailTodoId }, relations: ['regularTodo'] });
        if (!todo || todo?.regularTodo.student_id !== student.id) {
            return res.status(400).json('Không tìm thấy regular todo của bạn');
        }
        const schema = Joi.object({
            completed_status: Joi.string().valid(...Object.values(CompletedStatus)).optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });
        todo.completed_status = value.completed_status;
        const result = await detailTodoService.save(todo);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}

export const regularTodoController = {
    getRegularTododetail,
    updateDetailTodo,
}