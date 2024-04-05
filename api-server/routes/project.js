const express = require('express');
const router = express.Router();

const ProjectController = require('../modules/controller/ProjectController');

router.post('/create', ProjectController.create);
router.get('/list', ProjectController.list);

router.post('/scan', ProjectController.scan);
router.post('/deploy', ProjectController.deploy);


module.exports = router;