const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/hospital');
const validation = require('../middleware/validate');



router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveContact, contactsController.createHospital);

router.put('/:id', validation.saveContact, contactsController.updateHospital);

router.delete('/:id', contactsController.deleteHospital);

module.exports = router; 