const MongoContainer = require('../containers/mongo.container');
const cartModel = require('../services/mongo/models/cart.model');
const productModel = require('../services/mongo/models/product.model');

class CartsDao extends MongoContainer {
  constructor() {
    super(cartModel, productModel);
  };
};

module.exports = CartsDao;
