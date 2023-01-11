class MongoContainer {

    constructor(model) {
        this.model = model;
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
            return await this.model.find();
        }catch(err){
            throw new Error(err.message);
        }   
    };
}

module.exports = MongoContainer;