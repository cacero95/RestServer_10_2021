const { Schema, model } = require("mongoose");

module.exports = model(
    'Role',
    Schema ({
        name: {
            type: String,
            required: [ true, 'El nombre del rol es requerido' ]
        },
        permission: {
            type: String,
            required: [ true, 'El nivel de permisos son requeridos' ],
            enum: [
                "w", // write
                "r", // read
                "b", // buy
                "rb" // read buy
            ]
        }
    })
)