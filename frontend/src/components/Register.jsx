import React, { useState } from 'react';
import api from '../api'; // ✅ correct import
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/register", form); // ✅ use custom axios instance
      console.log("✅ Registered:", res.data);
      alert("Registered successfully! You can now login.");
      navigate('/login');
    } catch (error) {
      console.error("❌ Registration error:", error.response?.data || error.message);
      alert("Error during registration");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Name</label>
            <input type="text" className="form-control" id="username" name="username" value={form.username} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
