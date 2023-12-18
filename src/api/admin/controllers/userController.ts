import { Request, Response } from "express";
import {
  TeachingStatus,
  role,
  studyingStatus,
} from "../../../common/constants/status.constant";
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
    const schema = Joi.array()
      .items(
        Joi.object({
          // user_account
          username: Joi.string().required(),
          pass: Joi.string().min(6).required(),
          permission_id: Joi.number()
            .valid(...Object.values(role))
            .default(role.student)
            .required(),

          user_person: Joi.when("permission_id", {
            is: 2, // if permission_id = 2
            then: Joi.object({
              email: Joi.string().email().max(50).required(),
              full_name: Joi.string().required(),
              phone: Joi.string()
                .pattern(/^[0-9]{10}$/)
                .required(),
              address: Joi.string().max(100).required(),
              image: Joi.string().optional(),
              teacher: Joi.object({
                dob: Joi.date().required(),
                start_date: Joi.date().required(),
                education_level: Joi.string().required(),
                experience_year: Joi.number().required(),
                current_status: Joi.number()
                  .valid(...Object.values(TeachingStatus))
                  .default(TeachingStatus.teaching),
                department_id: Joi.number().required(),
              }).required(),
            }),
          }).required(),

          otherwise: Joi.object({
            email: Joi.string().email().max(50).required(),
            full_name: Joi.string().required(),
            phone: Joi.string()
              .pattern(/^[0-9]{10}$/)
              .required(),
            address: Joi.string().max(100).required(),
            image: Joi.string().optional(),
            student: Joi.object({
              dob: Joi.date().required(),
              admission_date: Joi.date().required(),
              sex: Joi.number()
                .valid(...Object.values(gender))
                .default(gender.men)
                .required(),
              current_status: Joi.number()
                .valid(...Object.values(studyingStatus))
                .default(studyingStatus.studying)
                .required(),
              program_id: Joi.number().required(),
              major_id: Joi.number().required(),
              class_id: Joi.number().required(),
            }).required(),
          }),
        }).required()
      )
      .required();

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ detail: error.message });

    const us = new UserService();

    const accountInfo = await value.reduce(
      async (accountArrayPromise, account) => {
        const accountArray = await accountArrayPromise;

        const isValidAccount = await us.isValidAccount(
          account as UserAccount,
          schoolId
        );

        if (isValidAccount) {
          accountArray.successes.push(account);
        } else {
          accountArray.failures.push(account);
        }

        return accountArray;
      },

      Promise.resolve({ successes: [], failures: [] } as {
        successes: any[];
        failures: any[];
      })
    );

    if (!accountInfo.successes.length) return res.status(400).json({ detail: 'danh sách tài khoản không hợp lệ', account_failures: accountInfo.failures });

    accountInfo.successes.map(async (account: UserAccount) => {
      const userAccount: UserAccount = { username: account.username, permission_id: account.permission_id, pass: hashPass(account.pass) };
      await us.saveAccount(userAccount);
      const person: UserPerson = {
        ...account.user_person,
        username: account.username,
      }
      const userPerson = await us.saveUserPerson(person);
      switch (account.permission_id) {
        case role.teacher:
          const teacher: Teacher = {
            ...account.user_person.teacher,
            user_id: userPerson.id,
          }
          await us.saveTeacher(teacher);
          break;
        case role.student:
          const student: Student = {
            ...account.user_person.student,
            user_id: userPerson.id,
          }
          await us.saveStudent(student);
          break;
      }

    });

    return res.status(200).json({ listAccountFailed: accountInfo.failures });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ detail: e.message });
  }
};

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
      status: Joi.number()
        .valid(...Object.values(TeachingStatus))
        .optional(),
      searchText: Joi.string().optional(),
      departmentId: Joi.number().optional(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    });

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
      status: Joi.number()
        .valid(...Object.values(studyingStatus))
        .optional(),
      searchText: Joi.string().optional(),
      departmentId: Joi.number().optional(),
      classId: Joi.number().optional(),
      page: Joi.number().default(1),
      limit: Joi.number().default(10),
    });

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
};
