const { response, request } = require('express');
const Product = require('../models/Product');

const get_allProducts = async ( req = request, res = response ) => {
    res.json({
        products: await Product.find()
    });
}

const post_product = async ( req = request, res = response ) => {
    const { role, ...document } = req.body;
    const newProduct = new Product( document );
    await newProduct.save().then(() => {
        res.json({
            message: 'Product created',
            newProduct
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })
}

const get_Product = async ( req = request, res = response ) => {
    const body = req.body;
    const product = body.name
    ? await Product.find({ name: body.name })
    : await Product.find({ type: body.type });
    product === null || product.length === 0 ? res.json({
        message: 'Producto no encontrado'
    }) : res.json ({
        message: 'Productos encontrados',
        product
    });
}


const put_product = async ( req = request, res = response ) => {
    const { role, ...document } = req.body;
    await Product.findByIdAndUpdate( req.params.id, document )
    .then(( product ) => {
        !product ? res.status( 400 ).json({
            message: 'Producto no encontrado'
        }) : res.json({
            message: 'Producto actualizado',
            product: {
                ...product._doc,
                ...document
            }
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
}

const delete_product = async ( req = request, res = response ) => {
    await Product.findByIdAndDelete( req.params.id )
    .then(( product ) => {
        !product ? res.status( 400 ).json({
            message: 'Producto no encontrado'
        }) : res.json({
            message: 'Producto Eliminado',
            product
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })
}


module.exports = {
    get_allProducts,
    get_Product,
    post_product,
    put_product,
    delete_product
}