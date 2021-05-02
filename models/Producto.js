const { Schema, model } = require("mongoose");

const ProductoSchema = Schema ({
    name: {
        type: String,
        required: [ true, 'El nombre del producto es requerido' ]
    },
    brand: {
        type: String,
        required: [ true, 'La marca del producto es requerida' ]
    },
    purchaseDate: {
        type: Date,
        required: [ true, 'La fecha de compra es requerida' ]
    }
});

module.exports = model( 'Producto', ProductoSchema );
