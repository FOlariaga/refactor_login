import cartsModel from "./models/carts.model.js";

class CartsManager {

    async get(){
        const carts = await cartsModel.find().lean();
        return carts
    }

    async getById(idCart) { 
        const cart = await cartsModel.find({_id : idCart}).lean()
        return cart
    }

    async add(data) {
        const newCart = await cartsModel.create(data)
        return newCart
    }

    async update(filter, update, options) {
        const cart = await cartsModel.findOneAndUpdate(filter, update, options);
        return cart
       }

       async delete(idCart) {
        try {
            const cart = await cartsModel.findOneAndDelete(idCart);
            console.log(cart);
        } catch (error) {
            
        }
    }

    //complemento
    async deleteProductInCart(cid, pid){
        //como filtro y elimino unicamente el producto dentro del array sin eliminar todo?
        const cart = await cartsModel.find(cid)
        return cart
    }

}

export default CartsManager