const { Schema, model } = require("mongoose");

const CompetitorSchema = Schema ({
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    updateAt: {
        type: Date
    },
    surname: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    age: {
        type: Number
    },
    telephone: {
        type: String
    },
    cellphone: {
        type: String,
        required: [ true, 'El campo celular es requerido' ]
    },
    address: {
        type: String,
        required: [ true, 'El campo direccion es requerido' ]
    },
    city: {
        type: String,
        required: [ true, 'El campo ciudad es requerido' ]
    },
    country: {
        type: String,
        required: [ true, 'El campo pais es requerido' ]
    },
    winner: {
        type: Boolean
    }
});

module.exports = model( 'Competiror', CompetitorSchema );
