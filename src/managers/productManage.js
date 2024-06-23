import fs from "fs";
import { v4 as uuid } from "uuid";

const path = "./src/managers/data/products.json";

let products = [];

//Agregar  un producto
const addProduct = async (product) =>{
    try {
        await getProducts();

        const { title, description, price, thumbnail, code, stock, category, status } = product;

        const newProduct = {
            id: uuid(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            category,
            status: true
        }

        products.push(newProduct);
        
        await fs.promises.writeFile(path, JSON.stringify(products));

        return newProduct;

    } catch (error) {
        console.log(`${error}`)
    }
}

//Leer productos
const getProducts = async (limit ) =>{
    try {
        const fileJson = await fs.promises.readFile(path, "utf-8");
        const parseFile = JSON.parse(fileJson);
        products = parseFile || [];

        return products;
    } catch (error) {
        console.log(`${error}`)        
    }
}

//Leer productos por ID
const getProductsById = async (id) => {
    try {
        await getProducts() 

        const product = products.find(p => p.id === id);
        
        return product;
        
    } catch (error) {
        console.log(`${error}`)
    }
}

//Actualizar un product
const updateProduct = async (id, prodcutData ) => {
    try {
        await getProducts();

        const index = products.findIndex(p => p.id === id);
        products[index] = {
            ...products[index],
            ...prodcutData,
        };

        await fs.promises.writeFile(path, JSON.stringify(products));

        return products[index];
        
    } catch (error) {
        console.log(`${error}`)
    }
}

//Eliminar un product
const deleteProduct = async (id) => {
    try {
        await getProducts() 

        products = products.filter(p => p.id !== id);
        await fs.promises.writeFile(path, JSON.stringify(products));

        return products;
        
    } catch (error) {
        console.log(`${error}`)
    }
}


export default {
    addProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct
}