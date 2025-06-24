const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const auth = require('../Middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.json({
      _id: question._id,
      title: question.title,
      description: question.description,
      anonymous: question.anonymous,
      postedBy: question.postedBy ? question.postedBy.toString() : null,
      createdAt: question.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, anonymous } = req.body;

    const question = new Question({
      title,
      description,
      anonymous,
      postedBy: anonymous ? null : req.user.id
    });

    await question.save();
    res.json(question);
  } catch (err) {
    console.error("Error in POST /questions", err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.delete('/:id', auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    if (!question.postedBy) {
      return res.status(403).json({ message: 'Anonymous questions cannot be deleted' });
    }

    if (question.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this question' });
    }

    await Question.deleteOne({ _id: req.params.id });  // 🔥 ✅ use this safer approach

    res.json({ message: 'Question deleted successfully!' });
  } catch (err) {
    console.error('Error deleting question', err);
    res.status(500).json({ message: 'Server error while deleting question' });
  }
});


module.exports = router;
