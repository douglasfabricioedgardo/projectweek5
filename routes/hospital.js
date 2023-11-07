const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/hospital');
const validation = require('../middleware/validate');
const security = require('../middleware/authorize.js');


router.get('/',security.checkLogin, contactsController.getAll);

router.get('/:id',security.checkLogin, contactsController.getSingle);

router.post('/',security.checkLogin, validation.saveContact, contactsController.createHospital);

router.put('/:id',security.checkLogin, validation.saveContact, contactsController.updateHospital);

router.delete('/:id',security.checkLogin, contactsController.deleteHospital);

module.exports = router; 