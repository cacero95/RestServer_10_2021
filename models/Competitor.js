const { Schema, model } = require("mongoose");

const CompetitorSchema = Schema ({
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ],
        unique: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
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
        unique: true,
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
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es requerida' ]
    },
    login: {
        type: Boolean,
        default: true
    }
});

module.exports = model( 'Competitor', CompetitorSchema );
