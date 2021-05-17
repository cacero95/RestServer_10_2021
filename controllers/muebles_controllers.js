const { response, request } = require("express");
const Mueble = require("../models/Mueble");


const get_allMuebles = async ( req = request, res = response ) => {
    res.json({
        muebles: await Mueble.find()
    })
}

const post_mueble = async ( req = request, res = response ) => {
    const mueble = new Mueble( req.body );
    await mueble.save().then(() => {
        res.json({
            message: 'Mueble Creado',
            mueble
        })
    }).catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })   
}

module.exports = {
    get_allMuebles,
    post_mueble
}