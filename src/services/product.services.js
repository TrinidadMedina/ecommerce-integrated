const {v4 : uuidv4} = require('uuid');
const DaoService = require('../daos/product.daos');

class ProductServices {
    constructor() {
      this.dao = new DaoService();
    };

    async createProduct(data) {
        Object.assign(data, {
            uuid: uuidv4()
        });
      const newProduct = await this.dao.create(data);
      return newProduct;
    };

    async getProducts() {
      const products = await this.dao.getAll();
      return products;
    };
};

module.exports = new ProductServices();