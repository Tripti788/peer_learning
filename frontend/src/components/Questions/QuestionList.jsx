import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Call backend API to get all questions
    axios.get('http://localhost:3000/api/questions')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => {
        console.error("Error fetching questions", err);
      });
  }, []);

  return (
    <div className='text-center container p-2'>
      <h3>All Questions</h3>
      <Link to="/question/ask" className="btn btn-primary mb-3">Post New Question</Link>

      {questions.length === 0 && <p>No questions available</p>}

      {questions.map(q => (
        <div key={q._id} className="card mb-3 p-3">
          <h5>{q.title}</h5>
          <p>{q.description}</p>
          <p><strong>Anonymous:</strong> {q.anonymous ? 'Yes' : 'No'}</p>
          <Link to={`/question/${q._id}`} className="btn btn-sm btn-secondary">View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
