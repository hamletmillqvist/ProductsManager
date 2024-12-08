import ProductModel from "@models/ProductModel";
import {Product} from "@entities/Product";
import NotFoundError from "@errors/NotFoundError";

export default class ProductService {

    async getProductList(searchTerm?: string | null): Promise<ProductModel[]> {
        return [];
    }

    async getProduct(id: number): Promise<ProductModel | null> {
        throw new NotFoundError("Could not find Product with id: " + id);
        const product = new Product(); // todo
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        };
    }
}