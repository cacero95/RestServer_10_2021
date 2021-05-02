const { request, response } = require("express");
const { dateCreator } = require("../helpers/dateCreator");
const Producto = require("../models/Producto");

const get_allProductos = async ( req = request, res = response ) => {
    res.json({
        productos: await Producto.find()
    })
}

const get_producto = async ( req = request, res = response ) => {
    const body = req.body;
    res.json({
        productos: await Producto.find({ ...body })
    });
}

const post_producto = async ( req = request, res = response ) => {
    const body = {
        ...req.body,
        purchaseDate: dateCreator()
    };
    const newProducto = new Producto( body );
    newProducto.save().then(() => {
        res.json({
            message: 'Producto creado',
            newProducto
        });
    }).catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}


module.exports = {
    get_allProductos,
    get_producto,
    post_producto
}