import express, {Request, Response} from "express";
import ProductService from "../../Services/ProductService";
import {StatusCodes} from "http-status-codes";
import JsonResponse from "@shared/JsonResponse";

const router = express.Router();
const productService = new ProductService();

const makeServiceCall = async (
    serviceCall: (query: Map<string, string>) => Promise<(object | string | number | null)>,
    query: Map<string, string>
): Promise<JsonResponse> => {
    try {
        const serviceResult = await serviceCall(query);
        const jsonBody = JSON.stringify(serviceResult);
        return new JsonResponse(StatusCodes.OK, null, jsonBody);
    } catch (error) {
        if (error instanceof Error) {
            return new JsonResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
        }

        return new JsonResponse(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const parseQuery = (
    query: any
) => {
    const queryMap = new Map<string, string>;
    for (let key in query) {
        const value = query[key];
        queryMap.set(key, value);
    }
    return queryMap;
}

const getJson = async (
    request: Request,
    response: Response,
    serviceCall: (a: any) => Promise<object | string | number | null>
) => {
    const query = parseQuery(request.query);
    const jsonResponse = await makeServiceCall(serviceCall, query);

    response.status(jsonResponse.code)
    response.json(jsonResponse.jsonBody);
}

const getProductList = async (
    request: Request,
    response: Response
) => {
    await getJson(request, response, productService.GetProductList);
}

const getProduct = async (
    request: Request,
    response: Response
) => {
    await getJson(request, response, productService.GetProduct);
}

export default () => {
    router.get("/", getProductList);
    router.get("/:id", getProduct);

    return router;
};