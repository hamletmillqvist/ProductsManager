import {StatusCodes} from "http-status-codes";
import JsonResponse from "@shared/JsonResponse";

export default abstract class ServerErrorBase extends Error {

    public readonly statusCode: StatusCodes;

    protected constructor(statusCode: StatusCodes, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }

    toJsonResponse(): JsonResponse {
        return new JsonResponse(this.statusCode, this.message);
    }
}