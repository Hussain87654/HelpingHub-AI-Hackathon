const HelpRequest = require('../models/HelpRequest');
const User = require('../models/User');

// @desc    Create new help request with AI logic
exports.createRequest = async (req, res) => {
  try {
    const { title, description, urgency: manualUrgency } = req.body;

    // --- Basic AI Categorization Logic ---
    let category = "General";
    let tags = [];
    const content = (title + " " + description).toLowerCase();

    if (content.includes("react") || content.includes("frontend") || content.includes("js")) {
      category = "Web Development";
      tags.push("React", "JavaScript");
    } else if (content.includes("python") || content.includes("data") || content.includes("ml")) {
      category = "Data Science";
      tags.push("Python", "AI");
    } else if (content.includes("ui") || content.includes("ux") || content.includes("figma")) {
      category = "Design";
      tags.push("UI/UX", "Figma");
    }

    // AI Urgency Detection (if not provided)
    const urgency = manualUrgency || (content.includes("urgent") || content.includes("asap") ? "High" : "Medium");

    const newRequest = await HelpRequest.create({
      title,
      description,
      category,
      tags,
      urgency,
      creator: req.user.id,
      aiSummary: `This is a ${urgency} priority ${category} request.`
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get all requests with filters (Category, Urgency)
exports.getRequests = async (req, res) => {
  try {
    const { category, urgency } = req.query;
    let query = {};

    if (category) query.category = category;
    if (urgency) query.urgency = urgency;

    const requests = await HelpRequest.find(query)
      .populate('creator', 'name trustScore')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get single request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id)
      .populate('creator', 'name trustScore email')
      .populate('helpers', 'name trustScore skills email');
      
    if (!request) return res.status(404).json({ msg: "Request not found" });

    res.json(request);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Offer help to a request
exports.offerHelp = async (req, res) => {
  try {
    const request = await HelpRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: "Request not found" });

    // Check if user is already a helper
    if (request.helpers.includes(req.user.id)) {
        return res.status(400).json({ msg: "Already offered help" });
    }

    request.helpers.push(req.user.id);
    request.status = 'In-Progress';
    await request.save();

    res.json({ msg: "Help offer sent successfully!", request });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Request Solved hone par helper ko reward dena
exports.markAsSolved = async (req, res) => {
    const request = await HelpRequest.findById(req.params.id);
    request.status = 'Solved';
    await request.save();

    // Reward the helper
    const helper = await User.findById(req.body.helperId);
    helper.trustScore += 10; // Increase trust score
    await helper.save();

    res.json({ message: "Request solved and Trust Score updated!" });
};