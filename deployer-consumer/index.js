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
    /**
     * write log to disk
     */
    await Application.log(error);
});


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`${process.env.SERVICE_NAME?.toUpperCase()} Server start at ${process.env.DOMAIN_NAME}:${PORT}`));

process
.on("SIGINT", async () => {
    console.log("Exiting.....Wait!");
    await Application.log(new Error(`${process.env.SERVICE_NAME?.toUpperCase()} Server start at ${process.env.DOMAIN_NAME}:${PORT} at STOPPED at ${new Date().toLocaleDateString()}`));
    try{
        /**
         * Disconnect consumer from server
         */
        await Application.stopListening();    
    }catch(error){
        await Application.log(error);
    }finally{
        setTimeout(process.exit, 10000);
    }
});