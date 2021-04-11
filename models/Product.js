const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    description: {
        type: String
    },
    type: {
        type: String,
        required: [ true, 'El campo tipo es requerido' ],
        enum: [
            "interior",
            "exterior"
        ]
    },
    price: {
        type: String,
        required: [ true, 'El campo precio es requerido' ]
    },
    material: {
        type: String
    },
    height: {
        type: Number,
        required: [ true, 'El campo alto es requerido' ]
    },
    width: {
        type: Number,
        required: [ true, 'El campo ancho es requerido' ]
    },
    depth: {
        type: Number,
        required: [ true, 'El campo profundidad es requerido' ]
    },
    color: {
        type: String
    },
    weight: {
        type: Number,
        required: [ true, 'El campo peso es requerido y debe darse en gramos' ]
    },
    status: {
        type: String,
        default: "available",
        enum: [
            "available",
            "unavailable",
            "sold"
        ]
    },
    count: {
        type: Number,
        required: [ true, "Se debe indicar la cantidad del producto" ]
    },
    picture: {
        type: String
    }
});

module.exports = model( 'Product', ProductSchema );