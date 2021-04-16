const { Schema, model } = require("mongoose");

const ItemSchema = Schema({
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ],
        unique: true
    },
    price: {
        type: Number,
        required: [ true, 'El campo precio es requerido' ]
    },
    description: {
        type: String,
        required: [ true, 'El campo descripcion es requerido' ]
    },
    competitor: {
        type: Array,
        default: []
    }
})

module.exports = model( 'Item', ItemSchema );