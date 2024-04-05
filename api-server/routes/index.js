const express = require('express');
const router = express.Router();

router.use('/project', require('./project'));

router.use('/organization', require('./organization'));


module.exports = router;