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

const schoolLinkedBusinesses = async (req: Request, res: Response) => {
    try {
        const schema = Joi.object({
            status: Joi.bool().default(true),
            search_text: Joi.string().optional(),
            limit: Joi.number().default(10),
            page: Joi.number().default(1),
        })

        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);

        const filter: FIlterSchoolLinkedBusiness = value;

        const ms = new ManageAppService();
        const data = await ms.schoolLinkedBusinesses(filter);
        return res.status(200).json(data);
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

    schoolLinkedBusinesses,
}