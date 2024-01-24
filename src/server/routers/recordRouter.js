const express = require('express');
const router = express.Router();

const recordController = require('../controllers/recordController');

router.post('/record', recordController.createRecord);

router.get('/record', recordController.getRecords);

module.exports = router;