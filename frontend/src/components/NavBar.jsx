import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.jpeg';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white ">
      <div className="container-fluid px-4">

        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '45px', width: '45px', borderRadius: '50%', marginRight: '10px' }}
          />
          <span className="fw-bold text-primary fs-4">PeerLearn</span>
        </Link>

        {/* Mobile Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center gap-3">
            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium text-dark" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium text-primary" to="/question/ask">Ask</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
