import { Request, Response } from "express";
import * as Joi from "joi";
import { SchoolService } from "../services/schoolService";
import { Program } from "../../../database/entities/Program";
import { Department } from "../../../database/entities/Department";
import { Class } from "../../../database/entities/Class";
import { FilterClass } from "../interfaces/class.interface";
import { FilterMajor } from "../interfaces/major.interface";
import { In } from "typeorm";
import { FilterAcademicYear } from "../interfaces/academic-year.interface";

const getSchool = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const ss = new SchoolService();
        const data = await ss.getSchool(schoolId);
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
        if (!schoolId) return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });
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
        const ss = new SchoolService();

        const department = await ss.getDepartment(schoolId, departmentId);
        if (!department) return res.status(400).json({ detail: 'Không tìm thấy khoa' });


        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        department.department_name = value.department_name;
        department.department_head = value.department_head;

        const data = await ss.saveDepartment(department);
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
        if (!schoolId) return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });
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
        const result = await ss.deleteDepartment(value.id, value.did);
        if (!result) return res.status(404).json({ detail: 'Xóa thất bại' });
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

// ----------------------- Major -----------------------

const saveMajor = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.object({
            id: Joi.number().min(1).optional(),
            major_name: Joi.string().required(),
            department_id: Joi.number().required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ss = new SchoolService();
        const major = ss.createMajor(value);
        const department = await ss.getDepartment(schoolId, major.department_id);
        if (!department) return res.status(400).json('department không tồn tại');
        let result;
        if (major.id) {
            const oldMajor = await ss.getOneMajor({ where: { id: major.id }, relations: ['department'] });
            if (!oldMajor) return res.status(400).json('major không tồn tại');
            if (oldMajor.department.school_id !== schoolId) return res.status(400).json('Bạn không có quyền truy cập vào major này');

            oldMajor.major_name = major.major_name;
            if (oldMajor.department_id !== major.department_id) {
                oldMajor.department_id = major.department_id;
                oldMajor.department = await ss.getOneDepartment({ where: { id: major.department_id } });
            }
            result = await ss.saveMajor(oldMajor);
        } else {
            result = await ss.saveMajor(major);
        }
        return res.status(200).json(result);

    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getMajors = async (req: Request, res: Response) => {
    try {
        const schoolId = parseInt(req.params.id);

        const schema = Joi.object({
            search_text: Joi.string(),
            department_id: Joi.number(),
            page: Joi.number().min(1).default(1),
            limit: Joi.number().min(1).default(10),
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FilterMajor = { ...value, schoolId };
        const ss = new SchoolService();
        const data = await ss.majors(filter);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteMajors = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.array().items(Joi.number()).required();

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ss = new SchoolService();
        const majors = await ss.getAllMajor({ where: { id: In(value) }, relations: ['department'] });
        const ids = []
        majors.forEach((major) => (major.department?.school_id === schoolId) && ids.push(major.id));
        const result = await ss.softDeleteMajor(ids);
        if (!result.affected) return res.status(400).json('danh sách major để xóa không hợp lệ');
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}
// ----------------------- Class -----------------------

const saveClass = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            class_name: Joi.string().required(),
            students: Joi.number().min(1).max(120).optional(),
            academic_year: Joi.number().required(),
            head_teacher: Joi.number().required(),
        });
        const department_id = parseInt(req.params.did) ?? null;
        const school_id = parseInt(req.params.id);
        const ss = new SchoolService();
        const department = await ss.getDepartment(school_id, department_id);
        if (!department) return res.status(400).json({ detail: 'Khoa không hợp lệ' });
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const Class: Class = {
            ...value,
            department_id: department_id,
        }

        const data = await ss.saveClass(Class);
        if (!data) return res.status(401).json({ detail: 'Thêm lớp sinh hoạt thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const updateClass = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            class_name: Joi.string().optional(),
            students: Joi.number().min(1).max(120).optional(),
            academic_year: Joi.number().optional(),
            head_teacher: Joi.number().optional(),
        });
        const schoolId = parseInt(req.params.id) ?? null;
        const classId = parseInt(req.params.cid) ?? null;
        const ss = new SchoolService();

        const departmentId = parseInt(req.params.did) ?? null;
        const department = await ss.getDepartment(schoolId, departmentId);
        if (!department) return res.status(400).json({ detail: 'Khoa không hợp lệ' });
        if (!classId) return res.status(400).json({ detail: 'thiếu mã lớp' });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const Class: Class = {
            ...value,
            id: classId,
            department_id: departmentId,
        }

        const data = await ss.saveClass(Class);
        if (!data) return res.status(401).json({ detail: 'cập nhật khoa học thất bại' });

        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getClasses = async (req: Request, res: Response) => {
    try {
        const schoolId = parseInt(req.params.id) ?? null;
        if (!schoolId) return res.status(400).json({ detail: 'không tìm thấy trường của bạn' });

        const schema = Joi.object({
            academic_year: Joi.number().optional(),
            head_teacher: Joi.number().optional(),
            department_id: Joi.number().optional(),
            search_text: Joi.string().optional(),
            page: Joi.number().default(1).optional(),
            limit: Joi.number().default(10).optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const filter: FilterClass = { ...value, school_id: schoolId };
        const ss = new SchoolService();

        const data = await ss.getClasses(filter);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteClass = async (req: Request, res: Response) => {
    try {
        const schoolId = parseInt(req.params.id);
        const classId = parseInt(req.params.cid);

        const ss = new SchoolService();
        const Class = await ss.getOneClass({ where: { id: classId }, relations: ['department'] });
        if (!Class) return res.status(400).json({ detail: 'Không tìm thấy thông tin class' });
        if (Class.department.school_id !== schoolId) return res.status(400).json({ detail: 'không có quyền xóa' });

        const result = await ss.deletClass(classId);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

// ---------------------------- AcademicYear -------------------------------
const saveAcademicYear = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;

        const schema = Joi.object({
            id: Joi.number().min(1).optional(),
            current_year: Joi.number().required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ss = new SchoolService();
        const academicYear = ss.createAcademicYear({ ...value, school_id: schoolId });
        let result;

        if (academicYear.id) {
            const oldAcademicYear = await ss.getOneAcademicYear({ where: { id: academicYear.id, school_id: schoolId } });
            if (!oldAcademicYear) {
                return res.status(400).json('academic year không tồn tại');
            }
        }
        result = await ss.saveAcademicYear(academicYear);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getAcademicYear = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;

        const schema = Joi.object({
            page: Joi.number().min(1).default(1),
            limit: Joi.number().min(1).default(5),
        })
        const { error, value } = schema.validate(req.query);
        if (error) return res.status(400).json(error);

        const filter: FilterAcademicYear = { ...value, schoolId };
        console.log(filter);
        const ss = new SchoolService();
        const data = await ss.academicYears(filter);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteAcademicYear = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const academicYearId = parseInt(req.params.aid);

        const ss = new SchoolService();
        const academicYears = await ss.getOneAcademicYear({ where: { id: academicYearId, school_id: schoolId } });
        if (!academicYears) {
            return res.status(400).json('academic year không tồn tại');
        }
        const result = await ss.softDeleteAcademicYear([academicYearId]);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

// ---------------------------- Semester -------------------------------
const saveSemester = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;

        const schema = Joi.object({
            id: Joi.number().min(1).optional(),
            semester_name: Joi.string().max(20).required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ss = new SchoolService();
        const semester = ss.createSemester({ ...value, school_id: schoolId });
        let result;

        if (semester.id) {
            const oldSemester = await ss.getOneSemester({ where: { id: semester.id, school_id: schoolId } });
            if (!oldSemester) {
                return res.status(400).json('semester không tồn tại');
            }
        }
        result = await ss.saveSemester(semester);
        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const getSemester = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.sschoolId;
        const ss = new SchoolService();
        const data = await ss.getAllSemester({ where: { school_id: schoolId } });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}

const deleteSemester = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const semesterId = parseInt(req.params.sid);

        const ss = new SchoolService();
        const semesters = await ss.getOneSemester({ where: { id: semesterId, school_id: schoolId } });
        if (!semesters) {
            return res.status(400).json('semester không tồn tại');
        }
        const result = await ss.softDeleteSemester([semesterId]);

        return res.status(200).json(result);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message })
    }
}
export const schoolController = {
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

    saveMajor,
    getMajors,
    deleteMajors,

    saveClass,
    updateClass,
    getClasses,
    deleteClass,

    saveAcademicYear,
    getAcademicYear,
    deleteAcademicYear,

    saveSemester,
    getSemester,
    deleteSemester,
}