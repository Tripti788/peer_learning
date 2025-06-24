const express = require('express');
const router = express.Router();
const Answer = require('../models/Answers');
const Question = require('../models/Question');
const auth = require('../Middleware/authMiddleware');

router.post('/:questionId/answers', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const answer = new Answer({
      answerText: req.body.answerText,
      questionId: req.params.questionId,
      postedBy: req.user.id
    });

    await answer.save();
    res.json(answer);
  } catch (err) {
    console.error("Error saving answer", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/:questionId/answers', async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    console.error("Error fetching answers", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
