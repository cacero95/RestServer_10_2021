const { response, request } = require('express');
const User = require('../models/User');

const get_allUsers = async ( req = request, res = response ) => {
    res.json({
        users: await User.find()
    })
}

const get_user = async ( req = request, res = response ) => {
    const body = req.body;
    await User.find({ ...body }).then(( user ) => {
        res.json({
            user
        })
    }).catch((err) => {
        res.status(400).json({
            message: err.messsage
        })
    })
}

const post_Users = async ( req = request, res = response ) => {
    const body = req.body;
    const newUser = new User( body );
    await newUser.save().then(() => {
        res.json({
            message: 'User created',
            newUser
        });
    }).catch((err) => {
        res.json({
            message: err.message
        })
    });
}

const put_user = async ( req = request, res = response ) => {
    const { role, ...document }  = req.body;
    await User.findByIdAndUpdate( req.params.id, document )
    .then(( user ) => {
        user ? res.json({
            message: 'Usuario actualizado',
            user: {
                ...user._doc,
                ...document
            }
        }) : res.status( 400 ).json({
            message: 'Usuario no encontrado'
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })
}

const delete_user = async ( req = request, res = response ) => {
    await User.findByIdAndDelete( req.params.id ).then((user) => {
        !user ? res.status(400).json({
            message: 'Usuario no encontrado'
        }) : res.json({
            message: 'Usuario Eliminado',
            user
        })
    }).catch((err) => {
        res.json({
            message: err.message
        })
    })
}

module.exports = {
    get_allUsers,
    post_Users,
    get_user,
    put_user,
    delete_user
}