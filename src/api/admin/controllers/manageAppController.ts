import { Request, Response } from "express";
import * as Joi from "joi";
import { School } from "../../../database/entities/School";
import { ManageAppService } from "../services/manageAppService";
import { FilterBusiness } from "../interfaces/business.interface";
import { UserAccount } from "../../../database/entities/UserAccount";
import { UserPerson } from "../../../database/entities/UserPerson";
import { Business } from "../../../database/entities/Business";
import { UserService } from "../services/userService";
import { Like, Not } from "typeorm";
import { hashPass } from "../../../common/helpers/common";
import { FIlterSchoolLinkedBusiness } from "../interfaces/school-linked-business.interface";
import { LinkedStatus } from "../../../database/entities/SchoolLinkedBusiness";


const getSchools = async (req: Request, res: Response) => {
    try {
        const ms = new ManageAppService();
        const schools = await ms.getAllSchool();
        return res.status(200).json(schools);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}
const saveSchool = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            id: Joi.number().optional(),
            school_name: Joi.string().max(50).required(),
            shorthand_name: Joi.string().max(20).required(),
            establish_date: Joi.date().required(),
            study_field: Joi.string().max(50).required(),
            avatar: Joi.string().max(500),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService()
        const school = ms.createSchool(value);
        if (school.id) {
            const oldSchool = ms.getOneSchool({ where: { id: school.id } });
            if (!oldSchool) return res.status(400).json('Trường không tồn tại');
        }

        const result = await ms.saveSchool(school);
        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const deleteSchool = async (req: Request, res: Response) => {
    try {
        const schema = Joi.array().items(
            Joi.number().required(),
        ).required();

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService();
        const result = await ms.softDeleteSchools(value);
        if (!result.affected) return res.status(400).json('Trường không tồn tại');
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const businesses = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            search_text: Joi.string().optional(),
            page: Joi.number().min(1).default(1).optional(),
            limit: Joi.number().default(10).optional(),
        });

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FilterBusiness = value;
        const ms = new ManageAppService();
        const result = await ms.bussnesses(filter);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const saveBusiness = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().max(6).optional(),
            permission_id: Joi.number().valid(4).default(4),
            user_person: Joi.object({
                full_name: Joi.string().max(75).required(),
                image: Joi.string().max(500).optional(),
                phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
                email: Joi.string().email().required(),
                address: Joi.string().max(100).required(),
                business: Joi.object({
                    establish_date: Joi.date().required(),
                    industry_sector: Joi.string().max(50).required(),
                    representator: Joi.string().max(50).required(),
                    short_desc: Joi.string().max(400).optional(),
                }).required(),
            }).required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const user_account: UserAccount = { username: value.username, permission_id: value.permission_id, pass: hashPass(value.pass) };
        const user_person: UserPerson = value.user_person;
        const business: Business = value.user_person.business;

        const us = new UserService();
        const ms = new ManageAppService();
        const isExistsUserName = await us.getOneAccount({ where: { username: user_account.username } });
        if (isExistsUserName) return res.status(400).json('username đã tồn tại');
        const isExistsUserPerson = await us.getOneUser({ where: { email: user_person.email, full_name: user_person.full_name } });
        if (isExistsUserPerson) return res.status(400).json('email hoặc tên công ty không hợp lệ');

        const result: UserAccount = await us.saveAccount(user_account);
        user_person.username = result.username;
        result.user_person = await us.saveUserPerson(user_person);
        business.user_id = result.user_person.id;
        result.user_person.business = await ms.saveBusiness(business);

        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const updateBusiness = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().max(6).optional(),
            user_person: Joi.object({
                full_name: Joi.string().max(75).required(),
                image: Joi.string().max(150).optional(),
                phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
                email: Joi.string().email().required(),
                address: Joi.string().max(100).required(),
                business: Joi.object({
                    establish_date: Joi.date().required(),
                    industry_sector: Joi.string().max(50).required(),
                    representator: Joi.string().max(50).required(),
                    short_desc: Joi.string().max(400).optional(),
                }).required(),
            }).required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const user_account: UserAccount = value;
        const user_person: UserPerson = value.user_person;
        const business: Business = value.user_person.business;

        const us = new UserService();
        const ms = new ManageAppService();

        const userAccount: UserAccount = await us.getOneAccount({ where: { username: user_account.username } });
        if (!userAccount) return res.status(400).json('Tài khoản không tồn tại');
        const isExistsUserPerson = await us.getOneUser({ where: { email: user_person.email, full_name: user_person.full_name, id: Not(user_person.id) } });
        if (isExistsUserPerson) return res.status(400).json('email hoặc tên công ty không hợp lệ');
        userAccount.pass = user_account.pass;

        const result: UserAccount = await us.saveAccount(userAccount);
        const userPerson = await us.getOneUser({ where: { username: result.username } });
        user_person.username = result.username;
        user_person.id = userPerson.id;

        result.user_person = await us.saveUserPerson(user_person);
        business.user_id = result.user_person.id;
        result.user_person.business = await ms.saveBusiness(business);

        return res.status(200).json(result);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const deleteBusinesses = async (req: Request, res: Response) => {
    try {
        const schema = Joi.array().items(
            Joi.number().required(),
        ).required();

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService();
        const result = await ms.softDeleteBusinesses(value);
        if (!result.affected) return res.status(400).json('Businesses không tồn tại');
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

// admin school
const adminSchools = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            search_text: Joi.string().optional(),
            school_id: Joi.number().optional(),
            limit: Joi.number().default(10),
            page: Joi.number().default(1),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);
        const { search_text, school_id, limit, page } = value;

        const ms = new ManageAppService();
        const data = await ms.adminSchools(
            search_text,
            school_id,
            page,
            limit,
        );
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const schoolLinkedBusinesses = async (req: Request, res: Response) => {
    try {
        const school_id = req.userData.schoolId;
        const schema = Joi.object({
            is_linked: Joi.bool().default(true),
            // status: Joi.string().valid(...Object.values(LinkedStatus)).default(LinkedStatus.APPROVED),
            limit: Joi.number().default(10),
            page: Joi.number().default(1),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FIlterSchoolLinkedBusiness = value;

        const ms = new ManageAppService();
        const data = await ms.schoolLinkedBusinesses(school_id, filter, value.is_linked);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const saveSchoolLinkedBusiness = async (req: Request, res: Response) => {
    try {
        const school_id = req.userData.schoolId;

        const schema = Joi.object({
            business_id: Joi.number().required(),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const ms = new ManageAppService();
        const isExist = await ms.getOneLinked({
            where: {
                school_id: school_id,
                business_id: value.business_id
            }
        });
        if (isExist) {
            return res.status(400).json('already business linked school');
        }
        const result = await ms.saveLinked(value);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const deleteSchoolLinkedBusiness = async (req: Request, res: Response) => {
    try {
        const school_id = req.userData.schoolId;

        const id = parseInt(req.params.id);
        const ms = new ManageAppService();
        const data = await ms.getOneLinked({ where: { id: id } });
        if (!data) {
            return res.status(400).json('Linked not found');
        } else if (data.school_id !== school_id) {
            return res.status(403).json('You are not allowed to delete');
        }
        const result = await ms.deleteLinkedById(id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const adminSchoolDetail = async (req: Request, res: Response) => {
    try {
        const adminId = parseInt(req.params.aid);

        const ms = new ManageAppService();
        const admin = await ms.getAdminById(adminId);
        if (!admin) {
            return res.status(400).json('admin not found');
        }
        return res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const saveAdmin = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            pass: Joi.string().min(6).required(),
            user_person: Joi.object({
                email: Joi.string().email().max(50).required(),
                full_name: Joi.string().required(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
                address: Joi.string().max(100).required(),
                image: Joi.string().optional(),
                administrator: Joi.object({
                    school_id: Joi.number().required(),
                }).required()
            }).required()
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const us = new UserService();
        const ms = new ManageAppService();

        const isValidAccout = await us.isValidAccount(
            value,
            value.user_person.administrator.school_id
        );
        if (!isValidAccout) {
            return res.status(400).json(' Kiểm tra lại thông tin tài khoản, có thể username hoặc email đã trùng');
        }

        value.pass = hashPass(value.pass);
        const user_account = us.createUserAccount({ username: value.username, pass: value.pass, permission_id: 1 });
        const userAccount = await us.saveAccount(user_account);
        const user_person = us.createUserPerson({ ...value.user_person, username: userAccount.username });
        const userPerson = await us.saveUserPerson(user_person);
        const administrator = await ms.createAdmin({ ...value.user_person.administrator, user_id: userPerson.id });
        const admin = await ms.saveAdmin(administrator);

        userPerson.administrator = admin;
        userAccount.user_person = userPerson;

        return res.status(200).json(userAccount);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const adminId = parseInt(req.params.aid);

        const ms = new ManageAppService();
        const result = await ms.softDeleteAdminById(adminId);
        if (!result) {
            return res.status(400).json('Admin not found');
        }
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ detail: error.message });
    }
}

export const manageAppController = {
    saveSchool,
    deleteSchool,
    getSchools,

    businesses,
    saveBusiness,
    updateBusiness,
    deleteBusinesses,

    adminSchools,
    adminSchoolDetail,
    saveAdmin,
    deleteAdmin,

    schoolLinkedBusinesses,
    saveSchoolLinkedBusiness,
    deleteSchoolLinkedBusiness,
}