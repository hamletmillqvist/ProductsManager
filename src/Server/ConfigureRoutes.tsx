import express, {Express, NextFunction, Request, Response, Router} from "express";
import {StatusCodes} from "http-status-codes";
import * as fs from "node:fs";
import ServerErrorBase from "@errors/ServerErrorBase";
import JsonResponse from "@shared/JsonResponse";
import ProductController from "@controllers/v1/ProductController";
import NotFoundError from "../Shared/Errors/NotFoundError";
import ControllerBase from "@controllers/ControllerBase";
import {HttpMethod} from "@shared/HttpMethod";
import "@shared/Extentions/ArrayExtentions"

function registerApiRoute(router: Router, func: Function) {
    // @ts-ignore
    const path = func["apiRoute_path"];

    const runFuncSafe = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await func(request, response);
        } catch (e: any) {
            next(e);
        }
    }

    // @ts-ignore
    switch (func["apiRoute_method"]) {
        case HttpMethod.GET:
            router.get(path, runFuncSafe);
            break;

        case HttpMethod.PUT:
            router.put(path, runFuncSafe);
            break;

        case HttpMethod.POST:
            router.post(path, runFuncSafe);
            break;

        case HttpMethod.DELETE:
            router.delete(path, runFuncSafe);
            break;

        default:
            break;
    }
}

function registerController(app: Express, controller: ControllerBase) {
    const router = express.Router();
    const propertyDescriptors = Object.getOwnPropertyDescriptors(controller);

    // @ts-ignore This is set through the descriptor
    const controllerRoute = `/api/${controller["apiRoute"]}`;

    for (let key in propertyDescriptors) {
        const descriptor = propertyDescriptors[key];
        if (typeof (descriptor.value) === "function") {
            registerApiRoute(router, descriptor.value as Function)
        }
    }

    app.use(controllerRoute, router);
}

function sendServerErrorJsonResponse(error: ServerErrorBase, request: Request, response: Response) {
    const decodedUrl = decodeURI(request.url);
    const jsonResponse = error.toJsonResponse(decodedUrl);
    console.error(jsonResponse);

    response
        .status(error.statusCode)
        .json(jsonResponse);
}

function sendUnknownErrorJsonResponse(error: Error, request: Request, response: Response) {
    console.error(error);
    response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new JsonResponse(StatusCodes.INTERNAL_SERVER_ERROR));
}

const ConfigureRoutes = (app: Express) => {

    registerController(app, ProductController);

    app.use("/api", (request: Request, response: Response, next: NextFunction) => {
        next(new NotFoundError());
    });

    app.use((request: Request, response: Response) => {
        // Since we've already passed through the static-middleware, we KNOW that the file is not in /www/
        // Therefore, we navigate to the index.html file and interpret the requests as a path in the Spa react router
        const accepts = request.accepts();
        if (accepts.any(x => x === "text/html")) {
            fs.readFile("www/index.html", (err: NodeJS.ErrnoException | null, data: Buffer) => {
                if (err) {
                    throw new NotFoundError();
                }

                response.write(data);
                response.end();
            });
        }
    });

    app.use((_request: Request, _response: Response) => {
        throw new NotFoundError();
    });

    app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof ServerErrorBase) {
            sendServerErrorJsonResponse(error, request, response);
            return;
        }

        sendUnknownErrorJsonResponse(error, request, response);
    });
}

export default ConfigureRoutes;