import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnswerForm from "../Answers/AnswerForm.jsx";
import api from "../../api";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Fetch question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await api.get(`/questions/${id}`);
        setQuestion(res.data);
      } catch (err) {
        console.error("Error fetching question", err);
      }
    };
    fetchQuestion();
  }, [id]);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await api.get('/auth/user');
        setCurrentUserId(res.data.id);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch answers
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const res = await api.get(`/answers/${id}/answers`);
        setAnswers(res.data);
      } catch (err) {
        console.error("Error fetching answers", err);
      }
    };
    fetchAnswers();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await api.delete(`/questions/${id}`);
        alert("Question deleted successfully");
        navigate("/");
      } catch (err) {
        console.error("Error deleting question:", err.response?.data || err.message);
        alert("Failed to delete question");
      }
    }
  };

  return (
    <div>
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "800px", marginTop: "10px" }}>
        <div className="card-header">Question ID: {question._id || id}</div>
        <div className="card-body">
          <h5 className="card-title">{question.title || "Loading..."}</h5>
          <p className="card-text">{question.description || "No description"}</p>

          <button
            onClick={handleDelete}
            className="btn btn-danger mb-3"
            disabled={currentUserId !== question.postedBy}
          >
            Delete Question
          </button>

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  Answers
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {answers.length > 0 ? (
                    answers.map((ans, index) => (
                      <div key={index} className="card mb-2 p-2">
                        {ans.answerText}
                      </div>
                    ))
                  ) : (
                    <p>No answers yet. Be the first one to answer!</p>
                  )}
                  <AnswerForm questionId={id} setAnswers={setAnswers} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
