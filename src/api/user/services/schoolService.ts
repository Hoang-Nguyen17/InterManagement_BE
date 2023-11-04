import { Semester } from "../../../database/entities/Semester";
import { AcademicYear } from "../../../database/entities/AcademicYear";
import { AppDataSource } from "../../../ormconfig";
import { FindOneOptions } from "typeorm";


export class SchoolService {
    private academicYearRespository = AppDataSource.getRepository(AcademicYear);
    private semesterRespository = AppDataSource.getRepository(Semester);


    // AcademicYear
    public getAcademicYear = async (): Promise<AcademicYear[]> => {
        const result = await this.academicYearRespository.find();
        return result;
    }

    public getOneAcademicYear = async (filter?: FindOneOptions<AcademicYear>) => {
        return await this.academicYearRespository.findOne(filter);
    }

    //Semester
    public getSemester = async (): Promise<Semester[]> => {
        const result = await this.semesterRespository.find();
        return result;
    }

    public getOneSemester = async (filter?: FindOneOptions<Semester>) => {
        return await this.semesterRespository.findOne(filter);
    }
}