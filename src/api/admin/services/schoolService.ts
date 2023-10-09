import { Program } from "../../../database/entities/Program";
import { School } from "../../../database/entities/School";
import { AppDataSource } from "src/ormconfig";


export class SchoolService {
    private shcoolRepository = AppDataSource.getRepository(School);
    private programRepository = AppDataSource.getRepository(Program);

    public getSchool = async (): Promise<School[]> => {
        try {
            const data = this.shcoolRepository.find({
                relations: ['program', 'department', 'department.major'],
            });
            return data;
        } catch (e) {
            throw e;
        }
    }

    public getPrograms = async (): Promise<Program[]> => {
        try {
            const data = this.programRepository.find();
            return data;
        } catch (e) {
            throw e;
        }
    }

    public saveProgram = async (program: Program): Promise<Program> => {
        try {
            if (program.id) {
                const oldData = await this.programRepository.findOne({
                    where: {
                        id: program.id,
                    }
                })
                if (!oldData) return;
                program.program_name = program.program_name ?? oldData.program_name;
                // program.school_id = program.school_id ?? oldData.school_id;
            }
            const result = this.programRepository.save(program)
            return result;
        } catch (e) {
            throw e;
        }
    }
}