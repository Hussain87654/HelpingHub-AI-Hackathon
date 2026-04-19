const express = require('express');
const router = express.Router();
const { getLeaderboard, getProfile } = require('../controllers/userController');
const { updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', getLeaderboard);
router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);

module.exports = router;