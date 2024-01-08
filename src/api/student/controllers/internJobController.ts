



import { Request, Response } from "express";
import * as Joi from "joi";
import { InternStatus } from "../../../database/entities/InternJob";
import { InternJobService } from "../../business/services/internService";

const internJobs = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;

        const issv = new InternJobService();

        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const updateInternJob = async (req: Request, res: Response) => {
    try {
        const userId = req.userData.id;

        const issv = new InternJobService();

        const schema = Joi.object({
          
        })
        const { error, value } = schema.validate(req.body);
        if (error) return res.status(400).json(error);


        return res.status(200).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const internJobController = {
    internJobs,
    updateInternJob,
}