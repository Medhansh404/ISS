const express = require('express');
const router = express.Router();
const statusController = require("../../controllers/statusController.js")



router.get('/', statusController.getPending);
router.post('/', statusController.updatePending);

module.exports = router;