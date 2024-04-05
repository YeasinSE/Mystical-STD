require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')

/**
 * Load Logger instance
 */
require("./logger/Logger");


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const apiRoute = require('./routes');

app.use(`/api/${process.env.API_VERSION}`, apiRoute);


sequelize
.authenticate()
.then( () => {
    console.log('Connection has been established successfully.');
}).catch( async error => {
    console.error('Unable to connect to the database:', error);
    await AppLogger.queueLog(error);
});


// process.on('unhandledRejection', (error) => {

// });
    
// process.on('uncaughtException', (error) => {

// });

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`${process.env.SERVICE_NAME} start at ${process.env.DOMAIN_NAME}:${PORT}`));

process
.on("SIGINT", async () => {
    console.log("Exiting.....Wait!");
    await AppLogger.queueLog(new Error(`${process.env.SERVICE_NAME?.toUpperCase()} Server at ${process.env.DOMAIN_NAME}:${PORT} STOPPED at ${new Date().toLocaleDateString()}`));
});