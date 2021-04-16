const { response, request } = require("express");
const Competitor = require("../models/Competitor");

const get_allCompetitors = async ( req, requets, res = response ) => {
    res.json({
        competitors: await Competitor.find()
    })
}

const post_competitor = async ( req = request, res = response ) => {
    const date = new Date();
    const body = {
        ...req.body,
        updateAt: `${ date.getFullYear }-${ date.getMonth }-${ date.getDay() }`
    };
    const newCompetitor = new Competitor( body );
    await newCompetitor.save().then(() => {
        res.json({
            message: 'Competidor creado',
            newCompetitor
        })
    }).catch((err) => {
        res.status(400).json({
            message: err.message
        })
    })
}

const get_competitor = async ( req = request, res = response ) => {
    const body = req.body;
    await Competitor.find({ ...body }).then(( competitors ) => {
        competitors.length === 0
        ? res.json({
            message: 'No se encontro ningun registro'
        }) : res.json({
            competitors
        })
    })
}

module.exports = {
    get_allCompetitors,
    post_competitor,
    get_competitor
}