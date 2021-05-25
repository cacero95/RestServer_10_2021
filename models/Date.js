const { Schema, model } = require("mongoose");

const DateSchema = Schema({
    patient: {
        type: String,
        required: [ true, "El id del paciente es requerido" ]
    },
    place: {
        type: String,
        required: [ true, "El lugar de la cita es requerida" ]
    },
    hcp: {
        type: String,
        required: [ true, "El id del hcp es requerido" ]
    },
    date: {
        type: Date,
        required: [ true, "La fecha de la cita es requerida" ]
    },
    confirmed: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});
const modelAppointment = model( 'Appointment', DateSchema );
module.exports = {
    modelAppointment,
    DateSchema
}