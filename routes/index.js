const express = require('express');
const router = express.Router();

router.use('/Hospital', require('./hospital'))

module.exports = router;