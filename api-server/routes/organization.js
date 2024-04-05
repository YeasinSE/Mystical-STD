const express = require('express');
const router = express.Router();

const OrganizationController = require('../modules/controller/OrganizationController');

router.post('/create', OrganizationController.create);
router.get('/all', OrganizationController.getAllOrganization);
router.get('/:provider/list', OrganizationController.listOrganization);

router.post('/project/create', OrganizationController.createProject);
router.get('/:organizationUUID/project-list', OrganizationController.listOrganizationProject);


module.exports = router;