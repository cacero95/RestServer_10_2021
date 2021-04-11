const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../dba/dbaConnection');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.users_path = "/api/users";
        this.products_path = "/api/products";
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
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log( `Escuchando por el puerto ${ this.port }` );
        })
    }
}
module.exports = Server;