const express = require('express');
const router = express.Router();

const LogController = require('../modules/controller/ProjectLogController');

router.get('/:projectId/process/:processId/sync', LogController.search);


module.exports = router;