import { Request, Response } from "express";
import * as Joi from "joi";
import { SchoolService } from "../services/schoolService";
import { Program } from "../../../database/entities/Program";
import { Department } from "src/database/entities/Department";

const getSchool = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const data = await ss.getSchool();
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}


// ----------------------- Program -----------------------
const saveProgram = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const program: Program = value;
        const ss = new SchoolService();
        const data = await ss.saveProgram(program);
        if (!data) return res.status(401).json({ detail: 'Thêm chương trình học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const updateProgram = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const program: Program = value;
        const ss = new SchoolService();
        const data = await ss.saveProgram(program);
        if (!data) return res.status(401).json({ detail: 'Cập nhật chương trình học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getPrograms = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId) return res.status(400).json({detail: 'không tìm thấy trường của bạn'});
        const data = await ss.getPrograms(schoolId);
        if (!data) return res.status(404).json({ detail: 'Không tìm thấy chưong trình' });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getProgram = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            pid: Joi.number().required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) return res.status(400).json(error);
        const data = await ss.getProgram(value.id, value.pid);
        if (!data) return res.status(404).json({ detail: 'Không tìm thấy chưong trình' });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteProgram = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            pid: Joi.number().required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) return res.status(400).json(error);
        const result = await ss.deleteProgram(value.id, value.pid);
        if (!result) return res.status(404).json({ detail: 'Xóa thất bại' });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

// ----------------------- Department -----------------------

const saveDepartment = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            department_name: Joi.string().required(),
            department_head: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const department: Department = {
            ...value,
            school_id: schoolId,
        }

        const ss = new SchoolService();
        const data = await ss.saveDepartment(department);
        if (!data) return res.status(401).json({ detail: 'Thêm khoa học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const updateDepartment = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            department_name: Joi.string().required(),
            department_head: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const departmentId = parseInt(req.params.did) ?? null;
        if (!departmentId) return res.status(400).json({detail: 'mã khoa sai'});


        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const department: Department = {
            ...value,
            school_id: schoolId,
            id: departmentId,
        }

        const ss = new SchoolService();
        const data = await ss.saveDepartment(department);
        if (!data) return res.status(401).json({ detail: 'cập nhật khoa học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getDepartments = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId) return res.status(400).json({detail: 'không tìm thấy trường của bạn'});
        const data = await ss.getDepartments(schoolId);
        if (!data) return res.status(404).json({ detail: 'Không tìm thấy khoa' });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getDepartment = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            did: Joi.number().required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) return res.status(400).json(error);
        const data = await ss.getDepartment(value.id, value.pid);
        if (!data) return res.status(404).json({ detail: 'Không tìm thấy khoa' });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteDepartment = async (req: Request, res: Response) => {
    try {
        const ss = new SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            did: Joi.number().required(),
        })
        const { error, value } = schema.validate(req.params);
        if (error) return res.status(400).json(error);
        const result = await ss.deleteDepartment(value.id, value.pid);
        if (!result) return res.status(404).json({ detail: 'Xóa thất bại' });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}
module.exports = {
    getSchool,

    saveProgram,
    updateProgram,
    getPrograms,
    getProgram,
    deleteProgram,

    getDepartments,
    getDepartment,
    saveDepartment,
    updateDepartment,
    deleteDepartment,
}