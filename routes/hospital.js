const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/hospital');
const validation = require('../middleware/validate');

router.get('/',isAuth, contactsController.getAll);

router.get('/:id', isAuth, contactsController.getSingle);

router.post('/', isAuth, validation.saveContact, contactsController.createHospital);

router.put('/:id', isAuth, validation.saveContact, contactsController.updateHospital);

router.delete('/:id', isAuth, contactsController.deleteHospital);

module.exports = router; 