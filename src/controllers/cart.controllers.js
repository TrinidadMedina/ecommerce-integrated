const cartServices = require('../services/cart.services');
const _ = require('lodash');

//let admin = false;
let admin = true;

exports.createCart =  async (req, res, next)=>{
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
        if (_.isNil(body.name)){
            return res.status(400).json({
                success: false, 
                message: 'Name atributte missing'
            });
        };
        
        const data = await cartServices.createCart(body);
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
       next(err) 
    } 
};

exports.getCarts = async (_req, res, next)=>{
    try{
        const data = await cartServices.getCarts();
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err); 
    }
};

exports.getCart = async (req, res, next)=>{
    try{
        const {uuid} = req.params;
        const data = await cartServices.getCart(uuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                data: 'Cart not found'
            });
        }
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err); 
    }
};

exports.insertProduct = async (req, res, next) => {
    try{
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `Route ${req.baseUrl} method ${req.method} Not authorized` 
            });
        };
        const {cartUuid, productUuid} = req.params;
        const data = await cartServices.insertProduct(cartUuid, productUuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                data: 'Item not found'
            });
        }
        res.status(200).json({
            success: true,
            data: data
        });
    }catch(err){
        next(err);
    }
};

exports.deleteProduct = async (req, res, next)=>{
    try{
        const {cartUuid, productUuid} = req.params;
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `Route ${req.baseUrl} method ${req.method} Not authorized` 
            });
        };
        const data = await cartServices.deleteProduct(cartUuid, productUuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                message: 'Item not found'
            });
        };
        res.status(200).json({
            succes: true,
            data: data
        });  
    }catch(err){
       next(err) 
    } 
};

exports.deleteCart = async (req, res, next)=>{
    try{
        if(!admin){
            return res.status(400).json({ 
                error: -1, 
                message: `Route ${req.baseUrl} method ${req.method} Not authorized` 
            })
        };
        const {uuid} = req.params;
        const data = await cartServices.deleteCart(uuid);
        if(_.isNil(data)){
            return res.status(400).json({
                success: false, 
                message: 'Cart not found'
            }) 
        };
        res.status(200).json({
            success: true,
            message: `Cart uuid: ${uuid} deleted`
        }); 
    }catch(err){
       next(err) 
    } 
};