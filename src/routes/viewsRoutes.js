import { Router} from "express";
import ProductsManager from "../dao/productsManager.js";
import CartsManager from "../dao/cartsManager.js";

const productsManager = new ProductsManager()
const cartsManager = new CartsManager()

const router = Router()

router.get("/products", async (req, res) => {
    const products = await productsManager.get({limit: req.query.limit || 10, page: req.query.page || 1, query : req.query.query || "" });
    res.render("products", {data: Object.assign(products,{category : req.query.query || ""})})
})

router.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid
    const product = await productsManager.getById(pid)

    res.render("oneProduct", { data: product })
})


router.get("/chat", async (req, res) => {
    res.render("chat", {})
})

router.get("/cart/:cid", async (req, res) => {
    const cid = req.params.cid
    const cart = await cartsManager.getById(cid)
    console.log(cart);
    res.render("cart", {data: cart})
})

router.get("/login", async (req, res) => {
    if(req.session.user){
        return res.redirect("/profile")
    }
    res.render("login", {})
})

router.get("/register", async (req, res) => {
    res.render("register", {})
})

router.get("/profile", async (req, res) => {

    if(!req.session.user){
        return res.redirect("/login")
    }
    res.render("profile", {user: req.session.user})
})

export default router