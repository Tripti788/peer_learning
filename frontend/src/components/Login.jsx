import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';


const Login = () => {
  const [form,setForm] = useState({email:' ',password:' '});
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({...form,[e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  }

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
  name="email"   // <-- important
  placeholder="Enter email"
  value={form.email}
  onChange={handleChange}
/>

          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
<input 
  type="password" 
  className="form-control" 
  id="password" 
  name="password"  // <-- important
  placeholder="Password"
  value={form.password}
  onChange={handleChange}
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
  )
}

export default Login
