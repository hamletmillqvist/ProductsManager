import express, {Express} from "express";
import compression from 'compression';
import ConfigureRoutes from "./ConfigureRoutes";
import { loadEnvFile } from "node:process";

// Grab environment variables
loadEnvFile('config.env')
const port = process.env.PORT;
if (!port) {
    throw new Error("Failed to launch server 'no part assigned'")
}

// Configure express
const app: Express = express();
app.use(compression());
app.use(express.static('www'));
ConfigureRoutes(app)

// Launch server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});