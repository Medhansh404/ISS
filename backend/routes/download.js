const express = require('express');
const router = express.Router();
const downloadController = require('../controllers/downloadController');

router.route('/')
    .get(downloadController.download);

module.exports = router;