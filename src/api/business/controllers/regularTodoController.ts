import { Request, Response } from "express";
import * as Joi from "joi";
import { BusinessService } from "../services/businessService";
import { RegularTodoService } from "../services/regularTodoService";
import { DetailTodoService } from "../services/detailTodoService";
import { TodoAppreciationService } from "../services/todoAppreciationService";
import { CompletedStatus, StatusFinished } from "../../../database/entities/DetailTodo";

const getRegularTodos = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const businessService = new BusinessService();
        const business = await businessService.getOne({ where: { user_id: id } });
        if (!business) {
            return res.status(400).json('Tài khoản này không phải business');
        }

        const regularTodoService = new RegularTodoService();
        const data = await regularTodoService.getRegularTodo(business.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}

const getRegularTododetail = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const businessService = new BusinessService();
        const business = await businessService.getOne({ where: { user_id: id } });
        if (!business) {
            return res.status(400).json('Tài khoản này không phải business');
        }
        const studentId = parseInt(req.params.studentId);
        const regularTodoService = new RegularTodoService();
        const data = await regularTodoService.getOne({
            where: {
                student_id: studentId, business_id: business.id
            },
            relations: [
                'student',
                'student.user_person',
                'detailTodo',
                'detailTodo.todoAppreciation',
            ]
        });
        if (!data) {
            return res.status(400).json('Không tìm thấy regular todo');
        }
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}

const saveRegularTodo = async (req: Request, res: Response) => {
    try {
        const id = req.userData.id;
        const businessService = new BusinessService();
        const business = await businessService.getOne({ where: { user_id: id } });
        if (!business) {
            return res.status(400).json('Tài khoản này không phải business');
        }
        const regular_id = parseInt(req.params.id);
        const regularTodoService = new RegularTodoService();
        const regular = await regularTodoService.getOne({ where: { id: regular_id, business_id: business.id } });
        if (!regular) {
            return res.status(400).json('regular todo không timf thấy');
        }

        const schema = Joi.object({
            id: Joi.number().min(1).optional(),
            todo_name: Joi.string().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
            completed_status: Joi.string().valid(...Object.values(CompletedStatus)).optional(),
            out_of_expire: Joi.string().valid(...Object.values(StatusFinished)).optional(),
            todoAppreciation: Joi.array().items(
                Joi.string().required(),
            ).optional(),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json({ detail: error.message });

        const todoDetailService = new DetailTodoService();
        if (value.id) {
            const olddetailTodo = await todoDetailService.getOne({ where: { id: value.id }, relations: ['regularTodo'] });
            if (!olddetailTodo || olddetailTodo?.regularTodo.business_id !== business.id) {
                return res.status(400).json('không tìm thấy detail todo');
            }
        }
        const todo = todoDetailService.create(value);
        const result = await todoDetailService.save(todo);
        if (value?.todoAppreciation.length) {
            const todoAppreciationService = new TodoAppreciationService();
            await todoAppreciationService.delete({ todo_id: todo.id });
            value.todoAppreciation.forEach( async element => {
                await todoAppreciationService.save(element);
            });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: `Internal server error: ${error.message}` });
    }
}
export const regularTodoController = {
    getRegularTodos,
    getRegularTododetail,
    saveRegularTodo,
}