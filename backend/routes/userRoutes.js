const express = require('express');
const router = express.Router();
const { getLeaderboard, getProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/leaderboard', getLeaderboard);
router.get('/me', protect, getProfile);

module.exports = router;