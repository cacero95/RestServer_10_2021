const dbConnection = async () => {
    try {
        const mongoose = require('mongoose');
        await mongoose.connect (
            process.env.MONGOURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('dba online');
    } catch ( err ) {
        console.log(err.message);
        throw new Error('Dba not initialized');
    }
}
module.exports = {
    dbConnection
}