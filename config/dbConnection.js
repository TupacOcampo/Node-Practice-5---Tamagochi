const mongoose = require("mongoose");

const connect = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
        if (dbConnection) {
            console.log(`DB Connection stablished: ${dbConnection.connection.host}`);
            console.log(`DB Connection stablished: ${dbConnection.connection.name}`);
        }

    } catch (error) {
        console.log(`DB Connection error: ${error}`);
    }
};

module.exports = connect;
