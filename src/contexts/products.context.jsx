import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase.utils.js";

// import SHOP_DATA from '../shop-data.js';

// As the actual value you want to access
export const ProductsContext = createContext({
    products: [],
});


export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);
    const value = { products };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
