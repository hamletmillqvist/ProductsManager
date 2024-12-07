import Product from "../Entities/Product";

export default class ProductRepository {
    @Get("/product")
    get(id: number): Product {
        
    }
}