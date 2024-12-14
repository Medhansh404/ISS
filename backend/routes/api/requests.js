const express = require('express');
const router = express.Router();
const requestController = require('../../controllers/requestController');

router.route('/')
    .get(requestController.getRequests)
    .put(requestController.respondRequest);

module.exports = router;