import {DataSource} from "typeorm"
import * as process from "node:process";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

const dataSourceSetting: MysqlConnectionOptions = {
    type: "mysql",
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const AppDataSource = new DataSource(dataSourceSetting);
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default AppDataSource;