import { Request, Response } from "express";
import { BadRequestException } from "@nestjs/common";
export declare const businessController: {
    getBusiness: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | BadRequestException>;
    getBusinessById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
