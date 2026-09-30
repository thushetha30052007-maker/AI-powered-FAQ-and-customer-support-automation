const FAQ = require('../models/FAQ');
const { asyncHandler } = require('../utils/helpers');

const getAllFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().populate('createdBy', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, count: faqs.length, data: faqs });
});

const getFAQById = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id).populate('createdBy', 'name email');
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
  res.json({ success: true, data: faq });
});

const createFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: faq });
});

const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });

  const isOwner = faq.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) return res.status(403).json({ success: false, message: 'Not authorized to update this FAQ' });

  const allowed = ['question', 'answer', 'category'];
  for (const key of allowed) if (req.body[key] !== undefined) faq[key] = req.body[key];
  await faq.save();
  res.json({ success: true, data: faq });
});

const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findById(req.params.id);
  if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });

  const isOwner = faq.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) return res.status(403).json({ success: false, message: 'Not authorized to delete this FAQ' });

  await faq.deleteOne();
  res.json({ success: true, message: 'FAQ deleted' });
});

const searchFAQs = asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) return res.status(400).json({ success: false, message: 'Search query q is required' });

  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const faqs = await FAQ.find({
    $or: [{ question: regex }, { answer: regex }, { category: regex }],
  }).sort({ createdAt: -1 });

  res.json({ success: true, count: faqs.length, query: q, data: faqs });
});

module.exports = { getAllFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ, searchFAQs };
