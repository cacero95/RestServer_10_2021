const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    type_document: {
        type: String,
        required: [ true, "El campo tipo documento es requerido" ],
        enum: [
            "CC",
            "TD",
            "PST"
        ]
    },
    number_document: {
        type: String,
        required: [ true, "El campo numero documento es requerido" ],
        unique: true
    },
    name: {
        type: String,
        required: [ true, 'El campo nombre es requerido' ]
    },
    phone: {
        type: Number,
        required: [ true, 'El campo telefono de residencia es requerido' ]
    },
    mobile: {
        type: Number
    },
    address: {
        type: String,
        required: [ true, 'El campo dirreccion es requerida' ]
    },
    city: {
        type: String,
        required: [ true, 'El campo ciudad de residencia es obligatoria' ]
    },
    department: {
        type: String,
        required: [ true, 'El campo departamento es requerido' ]
    },
    country: {
        type: String,
        required: [ true, 'El campo pais es requerido' ]
    },
    profession: {
        type: String
    },
    email: {
        type: String,
        required: [ true, "El campo email es requerido" ]
    }
});

module.exports = model( 'User', UserSchema );