const User = require('../models/User');
const { generateToken, asyncHandler } = require('../utils/helpers');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(400).json({ success: false, message: 'User already exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    data: { id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  res.json({
    success: true,
    data: { id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) },
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = { registerUser, loginUser, getUserProfile };
