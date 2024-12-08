import {NextFunction, Request, Response} from "express";
import ProductService from "@services/ProductService";
import JsonResponse from "@shared/JsonResponse";
import UserError from "@errors/UserError";
import {StatusCodes} from "http-status-codes";
import {ControllerRoute, ApiRoute} from "@controllers/ApiDecorator";
import ControllerBase from "@controllers/ControllerBase";
import {HttpMethod} from "@shared/HttpMethod";

@ControllerRoute("v1/product")
export default class ProductController extends ControllerBase {

    private static productService = new ProductService();

    @ApiRoute("/", HttpMethod.GET)
    static async getProducts(
        request: Request,
        response: Response
    ) {
        const products = await ProductController.productService.getProductList();
        response
            .status(StatusCodes.OK)
            .json(products);
    }

    @ApiRoute("/:id", HttpMethod.GET)
    static async getProduct(
        request: Request,
        response: Response
    ) {
        const id_str = request.params["id"];

        const id = parseInt(id_str);
        if (isNaN(id)) {
            throw new UserError("Parameter 'id' must be provided as a number");
        }

        const product = await ProductController.productService.getProduct(id);
        response
            .status(StatusCodes.OK)
            .json(new JsonResponse(StatusCodes.OK, null, JSON.stringify(product)));
    }
}