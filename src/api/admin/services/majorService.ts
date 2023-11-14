import { Major } from "../../../database/entities/Major";
import { AppDataSource } from "../../../ormconfig";

export class MajorService {
    private majorRes = AppDataSource.getRepository(Major);

    async getMajors() {
        const majors = await this.majorRes.find();
        return majors;
    }
}