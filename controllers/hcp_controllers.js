const { request, response } = require("express");
const { dateCreator } = require("../helpers/dateCreator");
const { modelHcp } = require('../models/Hcp');

const get_AllHcp = async ( req = request, res = response ) => {
    try {
        res.json({ hcp: await modelHcp.find() })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const filter_hcp = async ( req = request, res = response ) => {
    try {
        res.json({ hcp: await modelHcp.find({ ...req.body }) });
    } catch ( err ) {
        res.status(400).json({ message: err.message });
    }
}

const create_hcp = async ( req = request, res = response ) => {
    const fullDate = dateCreator();
    const newHcp = new modelHcp({
        ...req.body,
        created_at: fullDate,
        updated_at: fullDate
    });
    console.log( newHcp );
    await newHcp.save().then(() => {
        res.json({
            message: 'Paciente creado',
            nuevo_hcp: newHcp
        })
    }).catch( err => res.status(400).json({ mensaje: err.message }));

}

const update_hcp = async ( req = request, res = response ) => {
    try {
        const hcp = await modelHcp
        .findOneAndUpdate( req.params.id, req.body );
        hcp
        ? res.json({ 
            mensaje: 'hcp actualizado',
            hcp: { ...hcp._doc, ...req.body }
        }) : res.json({ mensaje: 'hcp no encontrado' });
    } catch ( err ) {
        res.status(400).json({ mensaje: err.message })
    }
}

module.exports = {
    get_AllHcp,
    filter_hcp,
    create_hcp,
    update_hcp
}

