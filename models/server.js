const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT
    }
    listen() {
        this.app.listen( this.port, () => {
            console.log( `Escuchando por el pueto ${ this.port }` );
        })
    }
}
module.exports = Server;