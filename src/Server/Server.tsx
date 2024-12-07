import {loadEnvFile} from 'node:process';
import express, {Express} from "express";
import compression from 'compression';
import ConfigureRoutes from "./ConfigureRoutes";

// Grab environment variables
loadEnvFile('config.env')
const port = process.env.PORT;

// Configure express
const app: Express = express();
app.use(compression());
app.use(express.static('www'));
ConfigureRoutes(app)

// Launch server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});