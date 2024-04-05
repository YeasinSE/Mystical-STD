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
    console.log("====== kernel error ====");
    console.log(error);
    await Application.queueLog(error);
    await Application.destroy("system");
});