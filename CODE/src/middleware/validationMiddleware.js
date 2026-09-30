const fail = (res, message) => res.status(400).json({ success: false, message });

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return fail(res, 'name, email and password are required');
  if (password.length < 6) return fail(res, 'Password must be at least 6 characters long');
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return fail(res, 'email and password are required');
  next();
};

const validateFAQ = (req, res, next) => {
  const { question, answer, category } = req.body;
  if (!question || !answer || !category) return fail(res, 'question, answer and category are required');
  next();
};

const validateAIAnswer = (req, res, next) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') return fail(res, 'question is required');
  next();
};

const validateAIFAQ = (req, res, next) => {
  const { topic } = req.body;
  if (!topic || typeof topic !== 'string') return fail(res, 'topic is required');
  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateFAQ,
  validateAIAnswer,
  validateAIFAQ,
};
