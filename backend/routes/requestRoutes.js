const express = require('express');
const router = express.Router();
const { createRequest, getRequests, getRequestById, offerHelp, markAsSolved } = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createRequest);
router.get('/', getRequests);
router.get('/:id', getRequestById);
router.put('/:id/offer', protect, offerHelp);
router.put('/:id/solve', protect, markAsSolved);

module.exports = router;