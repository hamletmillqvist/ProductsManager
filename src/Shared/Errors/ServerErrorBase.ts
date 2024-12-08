import {StatusCodes} from "http-status-codes";
import JsonResponse from "@shared/JsonResponse";

export default abstract class ServerErrorBase extends Error {

    public readonly statusCode: StatusCodes;
    public url?: string = undefined;

    protected constructor(statusCode: StatusCodes, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }

    toJsonResponse(url?: string): JsonResponse {
        this.url = url;

        const response = new JsonResponse(this.statusCode, this.message);

        response.url = this.url || null;

        return response;
    }
}