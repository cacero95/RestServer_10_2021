const Roles = require("../models/Roles");

const validateRole = async ( role = '' ) => {
    if ( !await Roles.findOne({ name: role }) ) {
        throw new Error(`El rol ${ role } no esta registrado en la base de datos`);
    }
}

const validatePermissionAdmin = async ( req, res, next ) => {
    const { role } = req.body;
    const roles = await Roles.findOne({ name: role });
    roles && roles.permission === 'w' 
    ? next()
    : res.status(400).json({
        message: `El role ${ role } no tienen acceso`
    });
}

const validatePermissionUser = async ( req, res, next ) => {
    const { role } = req.body;
    const roles = await Roles.findOne({ name: role });
    roles && roles.permission === 'rb' 
    ? next()
    : res.status(400).json({
        message: `El role ${ role } no tienen acceso`
    });
}

const validatePhone = ( req, res, next ) => {
    const { phone } = req.body;
    phone && `${ phone }`.length === 7 ? next()
    : res.json({
        message: 'El campo telefono domiciliario no es valido'
    });
}

module.exports = {
    validateRole,
    validatePermissionAdmin,
    validatePermissionUser,
    validatePhone
}