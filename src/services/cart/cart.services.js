const {v4 : uuidv4} = require('uuid');
const DaoService = require('../../daos/cart.daos');
  
class CartServices { 
    constructor() {
        this.dao = new DaoService();
    };

    async createCart(data) {
        Object.assign(data, {
            uuid: uuidv4()
        });
        const newCart = await this.dao.create(data);
        return newCart;
    };

    async getCarts() {
        const carts = await this.dao.getAll();
        return carts;
    };

    async getCart(uuid) {
        const cart = await this.dao.getOne(uuid);
        return cart;
    };

    async insertProduct(cartUuid, productUuid) {
        const cart = await this.dao.insertProduct(cartUuid, productUuid);
        return cart;
    };

    async deleteProduct(cartUuid, productUuid) {
        const cart = await this.dao.deleteProduct(cartUuid, productUuid);
        return cart;
    };

    async deleteCart(uuid) {
        const cart = await this.dao.delete(uuid);
        return cart;
    };
};

module.exports = new CartServices();