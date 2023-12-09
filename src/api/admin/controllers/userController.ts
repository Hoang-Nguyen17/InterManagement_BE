import { Request, Response } from "express";
import { TeachingStatus, role, studyingStatus } from "../../../common/constants/status.constant";
import { gender } from "../../../common/constants/gender.constant";
import { UserAccount } from "../../../database/entities/UserAccount";
import { hashPass } from "../../../common/helpers/common";
import { UserPerson } from "../../../database/entities/UserPerson";
import { UserService } from "../services/userService";
import { Teacher } from "../../../database/entities/Teacher";
import { Business } from "../../../database/entities/Business";
import { Student } from "../../../database/entities/Student";

import * as Joi from "joi";
import { IFilterTeacher } from "../interfaces/teacher.interface";
import { IFilterStudent } from "../interfaces/student.interface";

const register = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.array().items(
            Joi.object({
                // user_account
                username: Joi.string().required(),
                pass: Joi.string().min(6).required(),
                permission_id: Joi.number().valid(...Object.values(role)).default(role.student).required(),

                user_person: Joi.object({
                    email: Joi.string().email().max(50).required(),
                    full_name: Joi.string().required(),
                    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
                    address: Joi.string().max(100).required(),
                    image: Joi.string().optional(),

                    // teacher
                    teacher: Joi.when('permission_id', {
                        is: 2, // if permission_id = 2
                        then: Joi.object({
                            dob: Joi.date().required(),
                            start_date: Joi.date().required(),
                            education_level: Joi.string().required(),
                            experience_year: Joi.number().required(),
                            current_status: Joi.number().valid(...Object.values(TeachingStatus)).default(TeachingStatus.teaching),
                            department_id: Joi.number().required(),
                        }).required(),
                        otherwise: Joi.object().forbidden()
                    }),
    
                    // student
                    student: Joi.when('permission_id', {
                        is: 3, // if permission_id = 3
                        then: Joi.object({
                            dob: Joi.date().required(),
                            admission_date: Joi.date().required(),
                            sex: Joi.number().valid(...Object.values(gender)).default(gender.men).required(),
                            current_status: Joi.number().valid(...Object.values(studyingStatus)).default(studyingStatus.studying).required(),
                            program_id: Joi.number().required(),
                            major_id: Joi.number().required(),
                            class_id: Joi.number().required(),
                        }).required(),
                        otherwise: Joi.forbidden()
                    })
                }),
            })
        ).required();


        const { error, value } = schema.validate(req.body);
        console.log(value);
        if (error) return res.status(400).json({ detail: error.message });

        const us = new UserService();
        const accountInfo = await value.reduce(async (accountArrayPromise, account) => {
            const accountArray = await accountArrayPromise;
          
            const isValidAccount = await us.isValidAccount(account as UserAccount, schoolId);
          
            if (isValidAccount) {
              accountArray.successes.push(account);
            } else {
              accountArray.failures.push(account);
            }
          
            return accountArray;
          }, Promise.resolve({ successes: [], failures: [] } as { successes: any[]; failures: any[] }));
          
          console.log(accountInfo.successes, accountInfo.failures);
          
          return res.status(200).json(accountInfo);
          
        return res.status(200).json(accountInfo);

        value.map(async (value) => {


            const userAccount: UserAccount = {
                username: value.username,
                pass: hashPass(value.pass),
                permission_id: value.permission_id,
                token: null,
            }

            const userPerson: UserPerson = {
                id: null,
                image: value.image,
                username: value.username,
                email: value.email,
                full_name: value.full_name,
                phone: value.phone,
                address: value.address,
            }

            const isExistsEmail = await us.isExistsEmail(value.email);
            if (isExistsEmail) return res.status(400).json({ detail: 'email đã tồn tại' });

            const user_account: UserAccount = await us.saveUser(userAccount, userPerson);
            if (!user_account) return res.status(403).json({ detail: 'Tạo tài khoản không thành công' });

            switch (value.permission_id) {
                case role.teacher:
                    const teacher: Teacher = {
                        user_id: user_account?.user_person?.id,
                        ...value.teacher
                    }
                    user_account.user_person.teacher = await us.saveTeacher(teacher);
                    break;
                case role.student:
                    const student: Student = {
                        user_id: user_account?.user_person?.id,
                        ...value.student
                    }
                    user_account.user_person.student = await us.saveStudent(student);
                    break;
                case role.business:
                    const business: Business = {
                        user_id: user_account?.user_person?.id,
                        ...value.business
                    }
                    user_account.user_person.business = await us.saveBusiness(business);
                    break;
                default:
                    break;
            }
        });

        return res.status(200).json();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ detail: e.message });
    }
}

const getAdministrators = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const us = new UserService();
        const data = await us.getAdministrator(schoolId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getTeachers = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;

        const schema = Joi.object({
            status: Joi.number().valid(...Object.values(TeachingStatus)).optional(),
            searchText: Joi.string().optional(),
            departmentId: Joi.number().optional(),
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        })

        const { error, value } = schema.validate(req.query);
        if (error) return res.status(400).json(error);

        const filter: IFilterTeacher = { ...value, schoolId };
        const us = new UserService();
        const data = await us.getTeachers(filter);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

const getStudents = async (req: Request, res: Response) => {
    try {
        const schoolId = req.userData.schoolId;
        const schema = Joi.object({
            status: Joi.number().valid(...Object.values(studyingStatus)).optional(),
            searchText: Joi.string().optional(),
            departmentId: Joi.number().optional(),
            classId: Joi.number().optional(),
            page: Joi.number().default(1),
            limit: Joi.number().default(10),
        })

        const { error, value } = schema.validate(req.query);
        if (error) return res.status(400).json(error);

        const filter: IFilterStudent = { ...value, schoolId };
        const us = new UserService();
        const data = await us.getStudents(filter);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const userController = {
    register,
    getAdministrators,
    getTeachers,
    getStudents,
}