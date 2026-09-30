const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      index: 'text',
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true,
      index: 'text',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Technology', 'Education', 'Health', 'Banking', 'General'],
      default: 'General',
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator user reference is required'],
      index: true,
    },
  },
  { timestamps: true }
);

faqSchema.index({ question: 'text', answer: 'text', category: 'text' });

module.exports = mongoose.model('FAQ', faqSchema);
