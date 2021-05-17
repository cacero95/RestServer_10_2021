const { Schema, model } = require("mongoose");

const MueblesSchema = Schema({
    nombre: {
        type: String
    },
    descripcion: {
        type: String
    },
    tipo: {
        type: String
    },
    precio: {
        type: Number
    },
    imagen: {
        type: String
    },
    cantidad: {
        type: String
    },
    seleccion: {
        type: Boolean
    }
});

module.exports = model( 'Mueble', MueblesSchema );