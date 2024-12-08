import ServerApiUtil from "../Utils/ServerApiUtil";
import ProductModel from "@models/ProductModel";

export default class ProductApi {

    private static readonly baseUrl = "/api/v1/product";

    static async getProducts(searchTerm: string) {
        const jsonResponse = await ServerApiUtil.getJson(this.baseUrl, [{key: "search", value: searchTerm}]);
        return jsonResponse.Parse<ProductModel[]>();
    }

    static async getProduct(id: number) {
        const jsonResponse = await ServerApiUtil.getJson(`${this.baseUrl}/${id}`);
        return jsonResponse.Parse<ProductModel>();
    }
}