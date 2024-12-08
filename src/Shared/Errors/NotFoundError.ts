import {StatusCodes} from "http-status-codes";
import ServerErrorBase from "@errors/ServerErrorBase";

export default class NotFoundError extends ServerErrorBase {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}