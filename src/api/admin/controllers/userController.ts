import { School } from "../../../../src/database/entities/School";
import { AppDataSource } from "../../../../src/ormconfig";


export class schooService {
    private schoolRepository = AppDataSource.getRepository(School);

    public getSchools =async () => {
        try {
            return this.schoolRepository.find();
        } catch (e) {
            throw e;
        }
    }
}