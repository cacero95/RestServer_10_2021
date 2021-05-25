const { Schema, model } = require("mongoose");

const SymptomSchema = Schema({
    name: {
        type: String
    },
    description: {
        type: String
    }
});

const Vaccinated = Schema ({
    status: {
        type: Boolean,
        default: false
    },
    vaccine: {
        type: String,
        required: [ true, "El nombre de la vacuna es requerido" ]
    },
    date: {
        type: Date,
        required: [ true, "La fecha de la vacunación es requerida" ]
    }
})

const PatientSchema = Schema({
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
    profession: {
        type: String
    },
    email: {
        type: String,
        required: [ true, "El campo email es requerido" ],
        unique: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    vaccinated: {
        type: Vaccinated
    },
    symptom: {
        type: [ SymptomSchema ],
        default: []
    }
});

const modelPatient = model( 'Patient', PatientSchema );

module.exports = {
    modelPatient,
    PatientSchema
};