const { response, request } = require("express");
const { dateCreator } = require("../helpers/dateCreator");
const { modelAppointment } = require("../models/Date");
const { modelPatient } = require("../models/Patient");

const get_allPatients = async ( req = request, res = response ) => {
    res.json({ pacientes: await modelPatient.find() });
}

const filter_patient = async ( req = request, res = response ) => {
    await modelPatient.find({ ...req.body }).then( patients => {
        patients.length === 0
        ? res.status(400).json({
            mensaje: 'No se encontro ningun registro'
        }) : res.json({
            pacientes: patients
        })
    }).catch( err => res.status(400).json({ mensaje: err.message }));
}


const applyMaxDate = ( maxDate, res ) => {
    try {
        return modelPatient
            .find({ "vaccinated.date": { $lte: maxDate } });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const applyMinDate = ( minDate, res ) => {
    try {
        return modelPatient
            .find({ "vaccinated.date": { $gte: minDate } })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const minMaxDate = ( minDate, maxDate, res ) => {
    try {
        return modelPatient
            .find({ "vaccinated.date": { $gte: minDate, $lte: maxDate } });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


const filterPatientDateRange = async ( req = request, res = response ) => {
    const { minDate, maxDate } = req.body;
    let dates = [];
    if ( minDate && maxDate ) {
        dates = await minMaxDate ( minDate, maxDate, res );
    } else if ( minDate ) {
        dates = await applyMinDate( minDate, res );
    } else {
        dates = await applyMaxDate( maxDate, res );
    }
    res.json({
        citas: dates,
        numero: dates.length
    });
}

const post_patient = async ( req = request, res = response ) => {

    const fullDate = dateCreator();
    const newPatient = new modelPatient({
        ...req.body,
        created_at: fullDate,
        updated_at: fullDate
    });
    await newPatient.save().then(() => {
        res.json({
            message: 'Paciente creado',
            nuevo_paciente: newPatient
        })
    }).catch( err => res.status(400).json({ mensaje: err.message }));

}

const update_patient = async ( req = request, res = response ) => {
    try {
        const patient = await modelPatient
        .findOneAndUpdate( req.params.id, req.body );
        patient 
        ? res.json({ 
            mensaje: 'Paciente actualizado',
            paciente: { ...patient._doc, ...req.body }
        }) : res.json({ mensaje: 'Paciente no encontrado' });
    } catch ( err ) {
        res.status(400).json({ mensaje: err.message })
    }
}

const vaccinate = async ( req = request, res = response ) => {

    try {
        
        const appointment = await modelAppointment
        .findOne({ _id: req.params.id });

        if ( !appointment ) {
            res.status(400).json({
                message: 'Cita no encontrada'
            });
        } else {
            const patient = await modelPatient
            .findOne({ _id: appointment.patient });
            const vaccinated = {
                status: true,
                vaccine: req.body.vaccinate,
                date: new Date()
            }
            patient.vaccinated = vaccinated;
            patient.id_cita = appointment.patient
            await patient.save();
            res.json({
                mensaje: "paciente vacunado",
                paciente: {
                    ...patient._doc,
                },
            })
        }


    } catch ( err ) {
        res.status(400).json({ message: err.message })
    }
}

const addSymptoms = async ( req = request, res = response ) => {
    try {
        const patient = await modelPatient
        .findByIdAndUpdate( req.params.id, req.body );
        patient ? res.json ({
            mensaje: 'Sintomas agregados',
            paciente: { ...patient._doc, ...req.body }
        }) : res.status(400).json({
            mensaje: 'paciente no encontrado'
        })
    } catch ( err ) {
        res.status(400).json({ message: err.message })
    }
}


const make_report = async ( req = request, res = response ) => {
    try {

        const allPatients = await modelPatient.find();
        let patients = {
            total: allPatients.length,
            noVacunados: 0,
            vacunados: 0,
            pacientes: []
        };

        allPatients.forEach(( document ) => {
            patients = document.vaccinated.status ? {
                ...patients,
                vacunados: patients.vacunados + 1,
            } : {
                ...patients,
                noVacunados: patients.noVacunados + 1,
            };
            patients.pacientes.push({
                nombre: document.name,
                correo: document.email,
                celular: document.mobile,
                telefono: document.phone,
                vacunado: document.vaccinated
            })
        });
        patients["tasaVacunados"] = 
        `${ ( patients.vacunados * 100 ) / patients.total }%`;
        const actualDate = new Date();
        res.json({
            fecha: actualDate,
            hora: actualDate.getHours(),
            pacientes: {
                ...patients
            }
        })

    } catch ( err ) {
        res.status(400).json({ message: err.message })
    }
}

const filterPatientByHcp = async ( req = request, res = response ) => {
    try {
        const patient = await modelPatient.findOne({
            id_cita: req.body.hcp
        });
        patient ? res.json({
            paciente: patient
        }) : res.status(400).json({
            mensaje: "Paciente no encontrado"
        })
    } catch ( err ) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {
    get_allPatients,
    filter_patient,
    post_patient,
    update_patient,
    make_report,
    vaccinate,
    addSymptoms,
    filterPatientDateRange,
    filterPatientByHcp
}