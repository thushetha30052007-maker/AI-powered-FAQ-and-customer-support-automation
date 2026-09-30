const express = require('express');
const router = express.Router();
const {
  generateAIAnswer,
  generateAIFAQ,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const {
  validateAIAnswer,
  validateAIFAQ,
} = require('../middleware/validationMiddleware');

// Protected routes to prevent API overuse/abuse
router.post('/answer', protect, validateAIAnswer, generateAIAnswer);
router.post('/generate-faq', protect, validateAIFAQ, generateAIFAQ);

module.exports = router;
