import ServerErrorBase from "@errors/ServerErrorBase";
import {StatusCodes} from "http-status-codes";

export default class NotImplementedError extends ServerErrorBase {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}