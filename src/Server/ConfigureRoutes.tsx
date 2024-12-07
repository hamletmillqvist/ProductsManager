import {Express, Request, Response} from "express";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import * as fs from "node:fs";
import ProductRouter_v1 from "@routers/V1/ProductRouter";

const ConfigureRoutes = (app: Express) => {
    
    app.use("/api/v1/product", ProductRouter_v1());

    app.use("/api", (request: Request, response: Response) => {
        response
            .status(StatusCodes.NOT_FOUND)
            .send({
                error: getReasonPhrase(StatusCodes.NOT_FOUND)
            });
    });

    app.use((request: Request, response: Response) => {
        console.log("Request from", request.ip);
        fs.readFile("www/index.html", (err: NodeJS.ErrnoException | null, data: Buffer<ArrayBufferLike>) => {
            if (err) {
                console.error("Failed to read index.html");
                return;
            }

            response.write(data);
            response.end();
        });
    });
}

export default ConfigureRoutes;