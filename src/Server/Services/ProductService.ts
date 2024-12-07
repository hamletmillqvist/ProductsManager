import IProductModel from "@models/IProductModel";
import ProductRepository from "../Repositories/ProductRepository";

export default class ProductService {

    private productRepository = new ProductRepository();

    async GetProductList(searchTerm: string | null): Promise<IProductModel[]> {
        return [];
    }

    async GetProduct(id: number): Promise<IProductModel | null> {
        const product = await this.productRepository.Get(id);
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        };
    }
}