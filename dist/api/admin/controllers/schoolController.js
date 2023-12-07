"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolController = void 0;
const Joi = require("joi");
const schoolService_1 = require("../services/schoolService");
const getSchool = async (req, res) => {
    try {
        const schoolId = req.userData.schoolId;
        const ss = new schoolService_1.SchoolService();
        const data = await ss.getSchool(schoolId);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const saveProgram = async (req, res) => {
    try {
        const schema = Joi.object({
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const program = value;
        const ss = new schoolService_1.SchoolService();
        const data = await ss.saveProgram(program);
        if (!data)
            return res.status(401).json({ detail: 'Thêm chương trình học thất bại' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const updateProgram = async (req, res) => {
    try {
        const schema = Joi.object({
            id: Joi.number().required(),
            program_name: Joi.string().required(),
            school_id: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const program = value;
        const ss = new schoolService_1.SchoolService();
        const data = await ss.saveProgram(program);
        if (!data)
            return res.status(401).json({ detail: 'Cập nhật chương trình học thất bại' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getPrograms = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId)
            return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });
        const data = await ss.getPrograms(schoolId);
        if (!data)
            return res.status(404).json({ detail: 'Không tìm thấy chưong trình' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getProgram = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            pid: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error)
            return res.status(400).json(error);
        const data = await ss.getProgram(value.id, value.pid);
        if (!data)
            return res.status(404).json({ detail: 'Không tìm thấy chưong trình' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const deleteProgram = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            pid: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error)
            return res.status(400).json(error);
        const result = await ss.deleteProgram(value.id, value.pid);
        if (!result)
            return res.status(404).json({ detail: 'Xóa thất bại' });
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const saveDepartment = async (req, res) => {
    try {
        const schema = Joi.object({
            department_name: Joi.string().required(),
            department_head: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const department = {
            ...value,
            school_id: schoolId,
        };
        const ss = new schoolService_1.SchoolService();
        const data = await ss.saveDepartment(department);
        if (!data)
            return res.status(401).json({ detail: 'Thêm khoa học thất bại' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const updateDepartment = async (req, res) => {
    try {
        const schema = Joi.object({
            department_name: Joi.string().required(),
            department_head: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const departmentId = parseInt(req.params.did) ?? null;
        const ss = new schoolService_1.SchoolService();
        const department = await ss.getDepartment(schoolId, departmentId);
        if (!department)
            return res.status(400).json({ detail: 'Không tìm thấy khoa' });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        department.department_name = value.department_name;
        department.department_head = value.department_head;
        const data = await ss.saveDepartment(department);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getDepartments = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId)
            return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });
        const data = await ss.getDepartments(schoolId);
        if (!data)
            return res.status(404).json({ detail: 'Không tìm thấy khoa' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getDepartment = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            did: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error)
            return res.status(400).json(error);
        const data = await ss.getDepartment(value.id, value.pid);
        if (!data)
            return res.status(404).json({ detail: 'Không tìm thấy khoa' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const deleteDepartment = async (req, res) => {
    try {
        const ss = new schoolService_1.SchoolService();
        const schema = Joi.object({
            id: Joi.number().required(),
            did: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error)
            return res.status(400).json(error);
        const result = await ss.deleteDepartment(value.id, value.did);
        if (!result)
            return res.status(404).json({ detail: 'Xóa thất bại' });
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const saveClass = async (req, res) => {
    try {
        const schema = Joi.object({
            class_name: Joi.string().required(),
            students: Joi.number().min(1).max(120).optional(),
            academic_year: Joi.number().required(),
            head_teacher: Joi.number().required(),
        });
        const department_id = parseInt(req.params.did) ?? null;
        const school_id = parseInt(req.params.id);
        const ss = new schoolService_1.SchoolService();
        const department = await ss.getDepartment(school_id, department_id);
        if (!department)
            return res.status(400).json({ detail: 'Khoa không hợp lệ' });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const Class = {
            ...value,
            department_id: department_id,
        };
        const data = await ss.saveClass(Class);
        if (!data)
            return res.status(401).json({ detail: 'Thêm lớp sinh hoạt thất bại' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const updateClass = async (req, res) => {
    try {
        const schema = Joi.object({
            class_name: Joi.string().optional(),
            students: Joi.number().min(1).max(120).optional(),
            academic_year: Joi.number().optional(),
            head_teacher: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const classId = parseInt(req.params.cid) ?? null;
        const ss = new schoolService_1.SchoolService();
        const departmentId = parseInt(req.params.did) ?? null;
        const department = await ss.getDepartment(schoolId, departmentId);
        if (!department)
            return res.status(400).json({ detail: 'Khoa không hợp lệ' });
        if (!classId)
            return res.status(400).json({ detail: 'thiếu mã lớp' });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const Class = {
            ...value,
            id: classId,
            department_id: departmentId,
        };
        const data = await ss.saveClass(Class);
        if (!data)
            return res.status(401).json({ detail: 'cập nhật khoa học thất bại' });
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const getClasses = async (req, res) => {
    try {
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId)
            return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });
        const schema = Joi.object({
            academic_year: Joi.number().optional(),
            head_teacher: Joi.number().optional(),
            department_id: Joi.number().optional(),
            search_text: Joi.string().optional(),
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional(),
        });
        const { error, value } = schema.validate(req.body);
        if (error)
            return res.status(400).json(error);
        const filter = { ...value, school_id: schoolId };
        const ss = new schoolService_1.SchoolService();
        const data = await ss.getClasses(filter);
        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
const deleteClass = async (req, res) => {
    try {
        const schoolId = parseInt(req.params.id);
        const classId = parseInt(req.params.cid);
        const ss = new schoolService_1.SchoolService();
        const Class = await ss.getOneClass({ where: { id: classId }, relations: ['department'] });
        if (!Class)
            return res.status(400).json({ detail: 'Không tìm thấy thông tin class' });
        if (Class.department.school_id !== schoolId)
            return res.status(400).json({ detail: 'không có quyền xóa' });
        const result = await ss.deletClass(classId);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
};
exports.schoolController = {
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
    saveClass,
    updateClass,
    getClasses,
    deleteClass,
};
//# sourceMappingURL=schoolController.js.map