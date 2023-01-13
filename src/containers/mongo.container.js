class MongoContainer {

    constructor(model, productModel) {
        this.model = model;
        this.productModel = productModel;
    };

    async create(data) {
        try{
            return await this.model.create(data);
        }catch(err){
            throw new Error(err.message);
        }
    };

    async getAll() {
        try{
            if(this.productModel === undefined){
                return await this.model.find();
            }
            return await this.model.find().populate({
                path: 'products',
                select: '-_id, name'
            })
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async getOne(uuid) {
        try{
            const item = await this.model.findOne({uuid: uuid});
            if (!item){
                return null
            }
            if(item.products){
                return item.populate({
                    path: 'products',
                    select: '-_id, name'
                })
            }

            return item
        }catch(err){
            throw new Error(err.message);
        }   
    };

    async delete(uuid) {
        try{
            let data = await this.model.deleteOne({uuid: uuid});
            return data.deletedCount === 0 ? null : data;
        }catch(err){
            throw new Error(err);
        }
    };

    async insertProduct(cartUuid, productUuid) {
        try{
            const product = await this.productModel.findOne({uuid: productUuid});
            if (!product){
                return null;
            }
            const res = await this.model.updateOne({ uuid: cartUuid }, {$push: {products: product.id}});
            if(res.matchedCount === 0){
                return null;
            }
            const cartUpdated = await this.getOne(cartUuid);
            return cartUpdated;
        }catch(err){
            throw new Error(err.message);
        }
    };

    async deleteProduct(cartUuid, productUuid) {
        try{
            const product = await this.productModel.findOne({uuid: productUuid});
            if(!product){
                return null
            }
            const res = await this.model.updateOne({uuid: cartUuid}, {$pull: {products: product.id}});
            if(res.matchedCount === 0){
                return null;
            }
            const cartUpdated = await this.getOne(cartUuid);
            return cartUpdated;
        }catch(err){
            throw new Error(err);
        }
    };
}

module.exports = MongoContainer;