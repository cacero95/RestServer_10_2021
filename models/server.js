const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../dba/dbaConnection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.users_path = "/api/users";
        this.products_path = "/api/products";
        this.competitors_path = "/api/competitor";
        this.item_path = "/api/item";
        this.productos_path = "/api/producto";
        this.muebles_path = "/api/muebles";
        this.patient_path = "/api/patient";
        this.hcp_path = "/api/hcp";
        this.date_path = "/api/date"
        this.dbaConnection();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( express.static('public') );
    }

    async dbaConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use( this.users_path, require('../routes/user_routes') );
        this.app.use( this.products_path, require('../routes/product_routes') );
        this.app.use( this.competitors_path, require('../routes/competitor_routes') );
        this.app.use( this.item_path, require('../routes/item_routes') );
        this.app.use( this.productos_path, require('../routes/producto_routes') );
        this.app.use( this.muebles_path, require('../routes/muebles_routes') );
        this.app.use( this.patient_path, require('../routes/patient_routes') );
        this.app.use( this.hcp_path, require('../routes/hcp_routes') );
        this.app.use( this.date_path, require('../routes/date_routes') );
    }
    
    listen() {
        this.app.listen( this.port, () => {
            console.log( `Escuchando por el puerto ${ this.port }` );
        })
    }

}
module.exports = Server;