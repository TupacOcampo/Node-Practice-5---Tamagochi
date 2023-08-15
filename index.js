const express = require ("express");
const connect = require("./config/dbConnection");
const dotEnv = require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

connect();

app.use(express.json());
app.use("/api/v1/digimon", require("./routes/digimonRoute"));
app.use("/api/v1/tamer", require("./routes/tamerRoute"));

app.listen(PORT, (req, res) => {
    console.log(`App listening on port ${PORT}`);
})