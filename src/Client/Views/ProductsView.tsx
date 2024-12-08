import {useEffect, useState} from "react";
import {getUrlParam, updateUrlParam} from "../Utils/UrlUtil";
import ProductModel from "@models/ProductModel";
import SearchInput from "../Components/SearchInput";
import ProductApi from "../ApiHelpers/ProductApi";

const ProductsView = () => {

    const [searchTerm, setSearchTerm] = useState<string>(getUrlParam("search") ?? "");
    const [products, setProducts] = useState<ProductModel[] | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        updateUrlParam("search", searchTerm);
        await load();
    }

    const load = async () => {
        const result = await ProductApi.getProducts(searchTerm);
        setProducts(result)
    };

    useEffect(() => {
        load();
    }, []);

    return <div>
        <form onSubmit={e => onSubmit(e)} style={{minWidth: 120}}>
            <SearchInput initialValue={searchTerm} onChange={setSearchTerm} />
        </form>

        {!products ? <div>No results.</div>
            : <table>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Description</td>
                    <td>Price</td>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                </tr>)}
                </tbody>
            </table>}
    </div>
}

export default ProductsView;