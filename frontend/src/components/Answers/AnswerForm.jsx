import React, { useState } from 'react';
import '../../api';

const AnswerForm = ({ questionId, setAnswers }) => {
  const [answerText, setAnswerText] = useState('');
  const [submitting, setSubmitting] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    // ✅ SAFER way to get token
    const token = localStorage.getItem('token')?.trim();
    console.log("Token before submitting answer:", token);

    if (!token) {
      alert('You are not logged in. Please login first.');
      setSubmitting(false);
      return;
    }

    const res = await api.post(
      `/answers/${questionId}/answers`,
      { answerText },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Update answers after successful submission
    const updatedAnswers = await api.get(`/answers/${questionId}/answers`);
    setAnswers(updatedAnswers.data);
    setAnswerText('');
  } catch (err) {
    console.error('Error submitting answer', err);
    alert('Failed to submit answer');
  } finally {
    setSubmitting(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="form-control mb-2"
        rows="3"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        placeholder="Write your answer..."
        required
      />
      <button type="submit" className="btn btn-success" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit Answer'}
      </button>
    </form>
  );
};

export default AnswerForm;
