import {SqliteConnectionOptions} from "typeorm/driver/sqlite/SqliteConnectionOptions";

export default {
    type: "sqlite",
    database: process.env.DATABASE as string,
    entities: [
        "src/Server/Entities/*.ts"
    ],
} as SqliteConnectionOptions