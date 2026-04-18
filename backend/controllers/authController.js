const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Token banane ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: 'User already exists' });

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ msg: 'Invalid user data' });
  }
};

// @desc    Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ msg: 'Invalid email or password' });
  }
};

// controllers/authController.js mein add karo
exports.updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.skills = req.body.skills || user.skills;
    user.interests = req.body.interests || user.interests;
    user.location = req.body.location || user.location;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ msg: 'User not found' });
  }
};