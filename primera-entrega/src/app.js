import express from "express";
import productRouter from "./router/productRouter.js";
import cartRouter from "./router/cartRouter.js";

const PORT = 8080;
const app = express();

app.use(express.json()); //Este middleware nos permite leer archivos json con express.
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", productRouter);
app.use("/api", cartRouter);




app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`);
});

 