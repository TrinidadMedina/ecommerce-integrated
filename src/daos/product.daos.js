const MongoContainer = require('../containers/mongo.container');
const productModel = require('../services/mongo/models/product.model');

class ProductsDao extends MongoContainer {
  constructor() {
    super(productModel);
  };
};

module.exports = ProductsDao;