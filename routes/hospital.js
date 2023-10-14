const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/hospital');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createHospital);

router.put('/:id', contactsController.updateHospital);

router.delete('/:id', contactsController.deleteHospital);

module.exports = router;