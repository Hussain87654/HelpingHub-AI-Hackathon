const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, default: 'General' },
  tags: [String],
  urgency: { type: String, default: 'Medium' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  helpers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'Open' },
  aiSummary: String
}, { timestamps: true });

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
