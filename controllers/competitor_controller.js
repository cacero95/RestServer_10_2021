const { response, request } = require("express");
const { dateCreator } = require("../helpers/dateCreator");
const Competitor = require("../models/Competitor");
const Producto = require("../models/Producto");

const get_allCompetitors = async ( req = request, res = response ) => {
    res.json({
        competitors: await Competitor.find()
    })
}

const findProducto = async ( productos ) => {
    const documents = [];
    for ( let producto of productos ) {
        producto &&
        documents.push( await Producto.findOne({ _id: producto }) );
    }
    return documents;
}

const post_competitor = async ( req = request, res = response ) => {
    const fullDate = dateCreator();
    const { producto, ...document } = req.body;
    const body = {
        ...document,
        producto: await findProducto( producto ),
        created_at: fullDate,
        updated_at: fullDate
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

const login_competitor = async ( req = request, res = response ) => {
    const { address, password } = req.body;
    await Competitor.findOneAndUpdate({ address, password }, { login: true })
    .then((user) => {
        user ? res.json({
            message: `Welcome ${ user.name }`,
            id: user._id
        }) : res.json({
            message: `User was not found`
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })   
}

const logout_competitor = async ( req = request, res = response ) => {
    await Competitor.findByIdAndUpdate( req.params.id, { login: false })
    .then((user) => {
        user ? res.json({
            message: `See ya ${ user.name }`,
            id: user._id,
            login: false
        }) : res.json({
            message: `User was not found`
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })
}

const filterCompetitorsByletter = async ( req = response, res = response ) => {
    const letter = req.body.letter
    ? req.body.letter.toLocaleUpperCase()
    : 'A';
    // regex works for find documents that starts with anything
    await Competitor.find({ name: { $regex : `^${ letter }` }})
    .then(( documents ) => {
        documents.length > 0 ? res.json({
            documents
        }) : res.json({
            message: 'The system has not found any documents'
        })
    }).catch(( err ) => {
        res.status(400).json({
            message: err.message
        })
    })
}


module.exports = {
    get_allCompetitors,
    post_competitor,
    get_competitor,
    login_competitor,
    logout_competitor,
    filterCompetitorsByletter
}