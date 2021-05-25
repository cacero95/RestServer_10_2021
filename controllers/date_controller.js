const { request, response } = require("express");
const { dateCreator } = require("../helpers/dateCreator");
const { modelAppointment } = require("../models/Date");
const { modelHcp } = require("../models/Hcp");
const { modelPatient } = require("../models/Patient");

const get_AllDates = async ( req = request, res = response ) => {
    try {
        res.json({ cita: await modelAppointment.find() });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const filterByPerson = async ( req = request , res = response ) => {
    try {
        const date = await modelAppointment.findOne({ ...req.body });
        date ? res.json({ cita: date })
        : res.status(400).json({ mensaje: "Cita no encontrada" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const validateAppointment = ( { startTime, endTime, appointments }, time ) => {
    if ( appointments.length === 0 ) {
        return startTime;
    }
    const last_appointment = new Date( appointments[ appointments.length - 1 ] );
    console.log( last_appointment );
    last_appointment.setMinutes( last_appointment.getMinutes() + 30 );
    console.log( last_appointment );
    const starttime = new Date( startTime );
    const endtime = new Date( endTime );
    console.log( starttime );
    console.log( endtime );
    return last_appointment.getTime() >= starttime.getTime() &&
           last_appointment.getTime() < endtime.getTime()
           ? last_appointment : false;
}


const createDate = async ( req = request, res = response ) => {
    try {
        const { patient, place } = req.body;
        const actualDate = new Date();
        const allhcp = await modelHcp.find();
        if ( allhcp.length === 0 ) {
            res.status(400).json({ message: 'No se encontraron registros en la base de datos' });
        }
        else {
            let available_dates = [];
    
            while ( available_dates.length === 0 ) {
    
                for ( let { turns, number_document, ...hcp } of allhcp ) {
                    const verifyDate = validateAppointment( turns );
                    if ( verifyDate !== false ) {
                        available_dates.push({
                            date: verifyDate,
                            hcp: hcp._doc._id
                        });
                        turns.appointments.push( verifyDate );
                        await modelHcp.findOneAndUpdate (
                            { number_document },
                            { turns: { ...turns } }
                        );
                    }
                    if( available_dates.length > 0 ) break;
                }
                // for each iteration the actualdate is increase by 30 minutes
                actualDate.setMinutes( actualDate.getMinutes() + 30 );
            }
            const creationDate = dateCreator();
            const newDate = new modelAppointment({
                patient,
                place,
                hcp: available_dates[0].hcp,
                date: available_dates[0].date,
                created_at: creationDate,
                updated_at: creationDate
            });
            await newDate.save().then(() => {
                res.json({
                    mensaje: "cita creada",
                    cita: newDate
                });
            })
        }
    } catch ( err ) {
        res.status(400).json({ message: err.message });
    }
}


const applyMaxDate = async ( maxDate, res ) => {
    try {
        return await modelAppointment
            .find({ date: { $lte: maxDate } });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const applyMinDate = async ( minDate, res ) => {
    try {
        return await modelAppointment
            .find({ date: { $gte: minDate } })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const minMaxDate = async ( minDate, maxDate, res ) => {
    try {
        return await modelAppointment
            .find({ date: { $gte: minDate, $lte: maxDate } });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const filterByDateRange = ( req = request, res = response ) => {
    const { minDate, maxDate } = req.body;
    let dates = [];
    if ( minDate && maxDate ) {
        dates = minMaxDate ( minDate, maxDate, res );
    } else if ( minDate ) {
        dates = applyMinDate( minDate, res );
    } else {
        dates = applyMaxDate( maxDate, res );
    }
    res.json({
        citas: dates
    });
}

const filterDate = async ( req = request, res = response ) => {
    try {
        res.json({
            citas: await modelAppointment.find({ ...req.body })
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const roundDate = async ( req = request, res = response ) => {
    const { minDate, maxDate } = req.body;
    let dates = [];
    try {
        if ( minDate || maxDate ) {
            dates = minMaxDate( minDate, maxDate, res );
        } else {
            dates = await modelAppointment.find({ ...req.body });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports =  {
    get_AllDates,
    filterByPerson,
    createDate,
    filterByDateRange,
    filterDate
}