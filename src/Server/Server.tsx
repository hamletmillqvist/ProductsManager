import express, {Express, NextFunction, Request, Response} from "express";
import compression from 'compression';
import ConfigureRoutes from "./ConfigureRoutes";
import {loadEnvFile} from "node:process";

// Grab environment variables
loadEnvFile('config.env')
const port = process.env.EXPRESS_PORT;
if (!port) {
    throw new Error("Failed to launch server 'no part assigned'")
}

// Configure express
const app: Express = express();
app.use((request: Request, response: Response, next: NextFunction) => {
    const requestInfo = {
        url: request.url,
        body: request.body,
        accepts: request.accepts(),
        params: request.params,
        query: request.query,
    };
    console.log(`Request from ${request.ip} ${JSON.stringify(requestInfo)}`);
    next();
});
app.use(compression());
app.use(express.static('www'));
ConfigureRoutes(app)

// Launch server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});