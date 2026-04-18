const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  trustScore: { 
    type: Number, 
    default: 10 // New users starts with 10 points
  },
  contributions: { 
    type: Number, 
    default: 0 
  },
  skills: [String],
  interests: [String],
  location: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);