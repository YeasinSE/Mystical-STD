require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

/**
 * Load Logger instance application level. it's need to be access
 * everywhere in application.
 */
require("./logger/Logger");


const projectLogRoute = require('./routes');

app.use('/logs', projectLogRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`${process.env.SERVICE_NAME?.toUpperCase()} start at ${process.env.DOMAIN_NAME}:${PORT}`));

process
.on("SIGINT", async () => {
    console.log(">> Exiting.....Wait!");
    await AppLogger.queueLog(new Error(`${process.env.SERVICE_NAME?.toUpperCase()} Server start at ${process.env.DOMAIN_NAME}:${PORT} at STOPPED at ${new Date().toLocaleDateString()}`));
});