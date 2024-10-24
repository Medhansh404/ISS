import statusController from "../controllers/statusController.js"

router.get('/pendig', statusController.getPending);
router.post('/pendig', statusController.updatePending);

router.get('/dissapproved', statusController.getDisapproved);
router.post('/disapproved', statusController.updateDisapproved);
router.delete('/disapproved', statusController.deleteDisapproved);
module.exports = router;