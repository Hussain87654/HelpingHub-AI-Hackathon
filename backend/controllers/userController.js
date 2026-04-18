// controllers/userController.js
const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    // Highest trustScore wale top 10 bande uthao
    const topHelpers = await User.find()
      .sort({ trustScore: -1 })
      .limit(10)
      .select('name trustScore contributions');

    res.json(topHelpers);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
// @desc    Get User Profile & Stats
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};