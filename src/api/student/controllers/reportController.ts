import { Request, Response } from "express";
import { UserService } from "../../admin/services/userService";
import { ReportService } from "../services/reportService";
import * as Joi from "joi";

const report = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }

    const rsv = new ReportService();
    const report = await rsv.getOne({
        where: {
            student_id: student.id,
        }
    })
    return res.status(200).json(report);
}

const saveReport = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }

    const schema = Joi.object({
        report_file: Joi.string().required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const rsv = new ReportService();
    const report = rsv.create({
        report_file: value.report_file,
        student_id: student.id,
    })
    const result = await rsv.save(report);
    return res.status(200).json(result);
}

const saveReportBusiness = async (req: Request, res: Response) => {
    const { id } = req.userData;
    const us = new UserService();
    const student = await us.getOneStudent({ where: { user_id: id } });
    if (!student) {
        return res.status(400).json('Tài khoản không hợp lệ');
    }

    const schema = Joi.object({
        result_business_file: Joi.string().required(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json(error);

    const rsv = new ReportService();
    const report = rsv.create({
        result_business_file: value.result_business_file,
        student_id: student.id,
    })
    const result = await rsv.save(report);
    return res.status(200).json(result);
}
export const reportController = {
    report,
    saveReport,
    saveReportBusiness
}