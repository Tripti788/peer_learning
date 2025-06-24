const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answerText: String,
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);
