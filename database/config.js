const mongoose = require('mongoose');

const dbConnection = async ( ) => {

    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        
        console.log('DB Conectada!')

    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la DB')
    }
}


module.exports = {
    dbConnection
}