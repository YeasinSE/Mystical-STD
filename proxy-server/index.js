require('dotenv').config();
const express = require('express');
const app = express();

/**
 * Init Application
 */
const Application = require("./application/Application");

/**
 * Handle any request and resolve to actual server
 */
app.use( async (req, res) => await Application.handleRequest(req, res));

const PORT = process.env.PORT || "5003";

/**
 * Start application for listening
 */
Application
.run()
.then(_ => {
    app.listen(PORT, () => console.log(`Proxy Server start at PORT: ${PORT}`));
})
.catch( async (error) => {
    /**
     * write log to disk
     */
    await Application.log(error);
});