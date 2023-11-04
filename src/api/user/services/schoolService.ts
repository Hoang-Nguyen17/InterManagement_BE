import { Semester } from "../../../database/entities/Semester";
import { AcademicYear } from "../../../database/entities/AcademicYear";
import { AppDataSource } from "../../../ormconfig";


export class SchoolService {
    private academicYearRespository = AppDataSource.getRepository(AcademicYear);
    private semesterRespository = AppDataSource.getRepository(Semester);


    public getAcademicYear = async (): Promise<AcademicYear[]> => {
        const result = await this.academicYearRespository.find();
        return result;
    }

    public getSemester = async (): Promise<Semester[]> => {
        const result = await this.semesterRespository.find();
        return result;
    }
}