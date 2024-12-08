import JsonResponse, {IJsonResponseData} from "@shared/JsonResponse";

export default class ServerApiUtil {
    private static async callApi(
        relativeUrl: string,
        params?: {
            key: string,
            value?: string | null
        }[]
    ): Promise<Response> {
        const url = new URL(location.origin + relativeUrl);

        params
            ?.filter(f => !!f.value)
            .forEach(({key, value}) => url.searchParams.set(key, value!));

        return await fetch(url);
    }

    public static async getJson(
        relativeUrl: string,
        params?: {
            key: string,
            value?: string | null
        }[]
    ): Promise<JsonResponse> {
        const response = await this.callApi(relativeUrl, params);
        const responseJsonData: IJsonResponseData = await response.json();
        return JsonResponse.FromData(responseJsonData);
    }
}