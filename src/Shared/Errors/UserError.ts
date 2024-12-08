import {StatusCodes} from "http-status-codes";
import ServerErrorBase from "@errors/ServerErrorBase";

export default class UserError extends ServerErrorBase {
    constructor(message?: string) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}