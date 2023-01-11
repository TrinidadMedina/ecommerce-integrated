const productServices = require('../services/product.services.js');
const _ = require('lodash');

//let admin = false;
let admin = true;

exports.createProduct =  async (req, res, next)=>{
    try{
        const {body} = req;
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `route ${req.baseUrl} method ${req.method} Not authorized` 
            });
        };
        if(_.isEmpty(body)){
            return res.status(400).json({
                success: false, 
                message: 'Body data missing'
            });
        };
        if (_.isNil(body.name) || _.isNil(body.description) || _.isNil(body.image) || _.isNil(body.price) || _.isNil(body.stock)){
            return res.status(400).json({
                success: false, 
                message: 'Product atributte missing'
            });
        };
        
        const data = await productServices.createProduct(body);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
       next(err) 
    } 
};

exports.getProducts = async (_req, res, next)=>{
    try{
        const data = await productServices.getProducts();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err); 
    }
};

