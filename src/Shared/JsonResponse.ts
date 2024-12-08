import {getReasonPhrase, StatusCodes} from "http-status-codes";

export interface IJsonResponseData {
    code: StatusCodes;
    reasonPhrase: string;
    message: string | null;
    jsonBody: string | null;
    url: string | null;
}

export default class JsonResponse implements IJsonResponseData {
    public readonly code;
    public readonly reasonPhrase;
    public readonly message;
    public readonly jsonBody;
    public url;

    constructor(
        code: StatusCodes,
        message?: string | null,
        body?: string | null,
        url?: string | null
    ) {
        this.code = code;
        this.reasonPhrase = getReasonPhrase(this.code);
        this.message = message ?? null;
        this.jsonBody = body ?? null;
        this.url = url ?? null;
    }

    static FromData(data: IJsonResponseData): JsonResponse {
        return new JsonResponse(data.code, data.message, data.jsonBody);
    }

    get IsOk(): boolean {
        return this.code >= StatusCodes.OK && this.code < StatusCodes.MULTIPLE_CHOICES;
    }

    Parse<T>() {
        return JSON.parse(this.jsonBody!) as T;
    }
}