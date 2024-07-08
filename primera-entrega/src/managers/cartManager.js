import fs from "fs";
import { v4 as uuid } from "uuid";

let carts = [];

const path = "./src/managers/data/carts.json";

const getCarts = async ()=>{
    const cartsJason = await fs.promises.readFile(path, "utf-8");
    carts = JSON.parse(cartsJason) || [];

    return carts;
};

const createCart = async () => {
    await getCarts();
    const newCart = {
        id: uuid(),
        products: [],
    }

    carts.push(newCart);
    
    await fs.promises.writeFile(path, JSON.stringify(carts));
    return newCart;
};

const getCartById = async (cid) =>{
    await getCarts();   
    const cart = carts.find(c => c.id === cid);
    return cart;
};

const addProductCart = async (cid, pid) =>{
        await getCarts();
        const cart =  await getCartById(cid);

        const existingProduct = cart.products.find(p => p.product === pid);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const newProduct = { 
                product: pid, 
                quantity: 1 
            };
            cart.products.push(newProduct);
        }

        await fs.promises.writeFile(path, JSON.stringify(carts));    
        return cart;

};

const deleteCart= async (cid) => {
    try {
        await getCarts() 

        const cart = carts.filter(c => c.id !== cid);
        console.log(cart);
        if (!cart) {
            throw new Error(`Carrito con id ${cid} no encontrado.`);
        }
        await fs.promises.writeFile(path, JSON.stringify(cart));

        return cart;
        
    } catch (error) {
        console.log(`${error}`)
    }
}


export default{
    createCart,
    getCarts, 
    getCartById,
    addProductCart,
    deleteCart
}