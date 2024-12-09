import ProductModel from "@models/ProductModel";
import {Product} from "@entities/Product";
import NotFoundError from "@errors/NotFoundError";
import MySqlDataSource from "../MySqlDataSource";

export default class ProductService {

    private productRepository = MySqlDataSource.getRepository(Product);

    async getProductList(searchTerm?: string | null): Promise<ProductModel[]> {
        return [];
    }

    async getProduct(id: number): Promise<ProductModel | null> {
        const product = await this.productRepository.findOneBy({id: id});

        if (!product) {
            throw new NotFoundError("Could not find Product with id: " + id);
        }

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        };
    }
}