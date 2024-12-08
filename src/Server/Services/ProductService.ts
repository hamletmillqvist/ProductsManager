import IProductModel from "@models/IProductModel";
import {Product} from "@entities/Product";
import NotFoundError from "@errors/NotFoundError";

export default class ProductService {

    async getProductList(searchTerm?: string | null): Promise<IProductModel[]> {
        return [];
    }

    async getProduct(id: number): Promise<IProductModel | null> {
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