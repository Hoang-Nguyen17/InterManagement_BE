import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

const { MYSQL_ADDON_HOST, MYSQL_ADDON_PORT, MYSQL_ADDON_USER, MYSQL_ADDON_PASSWORD, MYSQL_ADDON_DB } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: MYSQL_ADDON_HOST,
    port: parseInt(MYSQL_ADDON_PORT),
    username: MYSQL_ADDON_USER,
    password: MYSQL_ADDON_PASSWORD,
    database: MYSQL_ADDON_DB,
    synchronize: true,
    logging: false,
    entities: [
        __dirname + '/database/entities/*{.ts,.js}',
    ],
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    subscribers: [],
})
