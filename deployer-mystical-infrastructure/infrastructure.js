/**
 * Init application
 */
const Application = require("./application/Kernel");

/**
 * Start application
 */
Application
.bootstrap()
.catch( async error => {
    console.log(error);
    /**
     * Send log to system logs
     */
    await Application.queueLog(error);

    /**
     * Release resources
     */
    await Application.destroy("system");
});