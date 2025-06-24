import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api";  // assuming you have axios instance setup in this file

const QuestionForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    anonymous: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckBox = (e) => {
    setForm({ ...form, anonymous: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/questions", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Question submitted successfully!");
      setForm({
        title: "",
        description: "",
        anonymous: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Error in submitting question:", error);
      alert(message, "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4">Ask a Question</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title"
              value={form.title} onChange={handleChange} placeholder="Enter your question title" required />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Describe your question...</label>
            <textarea className="form-control" id="description" name="description"
              value={form.description} rows="5" onChange={handleChange} placeholder="Provide details about your question" required />
          </div>

          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="anonymous"
              checked={form.anonymous} onChange={handleCheckBox} />
            <label className="form-check-label" htmlFor="anonymous">Post Anonymously</label>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? <Spinner size="sm" animation="border" /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
