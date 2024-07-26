const express = require('express');
const router = express.Router();
const tripController = require('../../controllers/tripController');

router.route('/')
    .get(tripController.getAllTrip)
    .post(tripController.createNewTrip)
    .put(tripController.updateTrip)
    .delete(tripController.deleteTrip);

router.route('/:id')
    .get(tripController.getTrip)
    .post(tripController.addAnotherTrip);

module.exports = router;