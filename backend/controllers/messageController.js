const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    
    // Add validation
    if (!receiverId || !content) {
      return res.status(400).json({ msg: 'Receiver and content are required' });
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content
    });

    const populatedMessage = await Message.findById(newMessage._id)
      .populate('sender', 'name')
      .populate('receiver', 'name');

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error('SendMessage Error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get messages between logged-in user and another user
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params; // The other person

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'name')
    .populate('receiver', 'name');

    res.json(messages);
  } catch (err) {
    console.error('GetMessages Error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc    Get unique conversation partners (Recent Chats)
exports.getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'name')
    .populate('receiver', 'name');

    // Extract unique partners
    const partnersMap = new Map();
    
    messages.forEach(msg => {
      let partner = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender;
      if (!partnersMap.has(partner._id.toString())) {
        partnersMap.set(partner._id.toString(), {
          user: partner,
          lastMessage: msg
        });
      }
    });

    res.json(Array.from(partnersMap.values()));
  } catch (err) {
    console.error('GetConversations Error:', err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
