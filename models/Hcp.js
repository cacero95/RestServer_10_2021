const { Schema, model } = require("mongoose");

const TurnSchema = Schema ({
    startTime: {
        type: Date,
        required: [ true, "se requiere la hora de inicio del hcp" ]
    },
    endTime: {
        type: Date,
        required: [ true, "se require la hora de finalizacion del hcp" ]
    },
    appointments: {
        type: [ Date ],
        default: []
    }
})

const HcpSchema = Schema ({
    name: {
        type: String,
        required: [ true, "El campo nombre es requerido" ],
    },
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
        required: [ true, 'El campo nombre es requerido' ],
        unique: true
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
        required: [ true, 'El campo dirreccion de residencia es requerida' ]
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
    email: {
        type: String,
        required: [ true, "El campo email es requerido" ],
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    turns: {
        type: TurnSchema,
        required: [ true, "se deben agendar los turnos del hcp" ]
    }
});
const modelHcp = model( 'Hcp', HcpSchema );
module.exports = {
    modelHcp,
    HcpSchema
}