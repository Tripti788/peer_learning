import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Fix 1: Use your configured axios instance (not axios directly)

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' }); // ✅ Fix 2: Remove spaces in initial values
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', form); // ✅ Use configured api instance
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      alert(error?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email" 
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <small>Don't have an account? <a href="/register">Register</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
