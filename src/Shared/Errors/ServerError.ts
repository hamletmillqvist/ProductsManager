import {StatusCodes} from "http-status-codes";
import ServerErrorBase from "@errors/ServerErrorBase";

export default class ServerError extends ServerErrorBase {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}