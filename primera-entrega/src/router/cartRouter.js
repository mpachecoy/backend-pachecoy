import { Router } from "express";
import cartManager from "../managers/cartManager.js";
import productManage from "../managers/productManage.js";

const router = Router();

router.post("/carts", async (req, res) => {
    try {
        const cart = await cartManager.createCart();

        res.status(201).json({status: "ok", cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(cid);

        if(!cart) return res.status(404).json({status: "error", msg: "Carrito no encontrado"});
        res.status(201).json({status: "ok", cart});
    } catch (error) {
        console.log(error);
        res.status(500).json( { status: "error", msg: "Error interno del servidor"} );
    }
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        if (!cid || !pid) return res.status(400).json({ status: "error", msg: "Faltan parámetros cid o pid" }) 
            
        const product = await productManage.getProductsById(pid);
        if(!product) return res.status(404).json({ status: "error", msg:"Prodcuto no encontrado"});

        const cart = await cartManager.addProductCart(cid, pid);
        console.log(cart);
        if(!cart) return res.status(404).json( {status: "error", msg: "Carrito no encontrado"} );
  
        res.status(201).json({status: "ok", cart});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    }
});

router.delete("/carts/:cid", async (req, res) =>{
    try {
        const { cid } = req.params;
        const cart = await cartManager.deleteCart(cid);
        if(!cart) return res.status(404).json({ status: "error", msg: "Carrito no encontrado"});
        await cartManager.deleteCart(cid);
    
        res.status(200).json({status:"ok", msg: `Carrito eliminado con exito ${cid}`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor"});
    }
})


export default router;
