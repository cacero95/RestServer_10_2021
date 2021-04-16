const { response, request } = require("express");
const Item = require("../models/Item");

const get_allItems = async ( req = request, res = response ) => {
    res.json({
        products: await Item.find()
    });
}

const post_item = async ( req = request, res = response ) => {
    const date = new Date();
    const fullDate = `${ date.getFullYear }-${ date.getMonth }-${ date.getDay() }`; 
    const newItem = new Item({
        ...req.body,
        created_at: fullDate,
        updated_at: fullDate
    });
    await newItem.save().then(() => {
        res.json({
            message: 'Competidor creado',
            newItem
        })
    }).catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const get_item = async ( req = request, res = response ) => {
    const body = req.body;
    await Item.find({ ...body }).then(( items ) => {
        items.length === 0
        ? res.json({
            message: 'No se encontro ningun registro'
        }) : res.json({
            items
        })
    })
}

module.exports = {
    get_allItems,
    post_item,
    get_item
}