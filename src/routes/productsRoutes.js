import { Router } from "express";
import config  from "../config.js";
import { uploader } from '../uploader.js';
import ProductsManager from "../dao/productsManager.js";
// import productsModel from "../dao/models/products.model.js"

const productsManager = new ProductsManager()
const router = Router()

router.get("/", async (req, res) => {
    try {
            const products = await productsManager.get({limit: req.query.limit || 10, page: req.query.page || 1, query : req.query.query || ""})
            res.status(200).send({origin: config.SERVER, payload: products})
        

    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid
        const product = await productsManager.getById(pid)
        console.log(product);

        res.status(200).send({origin: config.SERVER, payload: product})
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.post("/", uploader.single('thumbnails'), async (req, res) => {
    try {
        if (req.file) {
            const thumbnail = {thumbnail: req.file.originalname || ""}
            const data = {...req.body, ...thumbnail}
            const process = await productsManager.add(data)
            res.status(200).send({ origin: config.SERVER, payload: process });
        } else {
            const process = await productsManager.add(req.body)     
            res.status(200).send({ origin: config.SERVER, payload: process });
        }
        
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const filter = { _id: req.params.pid };
        const update = req.body;
        const options = { new: true };
        const process = await productsManager.update(filter, update, options);
        
        res.status(200).send({ origin: config.SERVER, payload: process });
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const pid = {_id : req.params.id } 
        await productsManager.delete(pid);
        console.log(`producto eliminado de la base de datos`);

        res.status(200).send({ origin: config.SERVER, payload: "eliminado" });
    } catch (error) {
        res.status(500).send({origin: config.SERVER, payload: null})
    }
})

export default router