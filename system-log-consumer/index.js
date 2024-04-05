require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Init Application
 */
const Application = require("./application/Application");


/**
 * Start application for listening
 */
Application
.run()
.catch( async (error) => {
    console.log(error);
    /**
     * write log to disk
     */
    await Application.log(error);
    /**
     * Disconnect DB
     */
    await Application.disConnect();
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`${process.env.SERVICE_NAME?.toUpperCase()} Server consumer start at ${process.env.DOMAIN_NAME}:${PORT}`));

process.on("SIGINT", async () => {
    console.log("Exiting.... wait");
    await Application.log(new Error(`${process.env.SERVICE_NAME?.toUpperCase()} Server start at ${process.env.DOMAIN_NAME}:${PORT} at STOPPED at ${new Date().toLocaleDateString()}`));
    await Application.disConnect();
    setTimeout(process.exit, 10000);
});