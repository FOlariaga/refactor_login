import { Router } from "express";
import config from "../config.js";
import CartsManager from "../dao/cartsManager.js";

const cartsManager = new CartsManager()
const router = Router()

router.get("/", async (req, res) => {
    try {
        const carts = await cartsManager.get()

        res.status(200).send({ origin: config.SERVER, payload: carts });
    } catch (err) {
        res.status(500).send({ origin: config.SERVER, payload: null});
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid
        const cart = await cartsManager.getById(cid)

        res.status(200).send({origin: config.SERVER, payload: cart})
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.post("/", async (req, res) => {
    try {
        const cart = await cartsManager.add(req.body)     
            res.status(200).send({ origin: config.SERVER, payload: cart });
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null})
    }
})

router.put("/:cid", async (req, res) => {
    try {
        const filter = { _id: req.params.cid };
        const update = req.body;
        const options = { new: true };
        const cart = await cartsManager.update(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: cart });
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const cid = {_id : req.params.cid } 
        await cartsManager.delete(cid);
        console.log(`carrito eliminado de la base de datos`);

        res.status(200).send({ origin: config.SERVER, payload: "eliminado" });
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})



// eliminar el producto especifico del array
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cart = await cartsManager.deleteProductInCart(cid,pid)

        res.status(200).send({ payload: cart });
    } catch (error) {
        res.status(500).send({ origin: config.SERVER, payload: null})
    }
})

export default router