import {getReasonPhrase, StatusCodes} from "http-status-codes";

export default class JsonResponse {
    public readonly code: StatusCodes;
    public readonly reasonPhrase: string;
    public readonly message: string | null;
    public readonly jsonBody: string | null;

    constructor(code: StatusCodes, message?: string | null, body?: string | null) {
        this.code = code;
        this.reasonPhrase = getReasonPhrase(this.code);
        this.message = message ?? this.reasonPhrase;
        this.jsonBody = body ?? null;
    }

    get IsOk(): boolean {
        return this.code >= StatusCodes.OK && this.code < StatusCodes.MULTIPLE_CHOICES;
    }

    Parse = <T>(): T => {
        return JSON.parse(this.jsonBody!);
    }
}