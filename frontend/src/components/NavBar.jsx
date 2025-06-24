import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.jpeg';

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          {/* Logo on the left */}
          <img src={logo} alt="Logo" style={{ height: '60px', background: 'transparent', borderRadius: '50%' }} />
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar items on the right */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto p-2" style={{width:'350px',display:'flex',justifyContent:'space-evenly'}}>
              <li className="nav-item  ">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/question/ask">Ask</Link>
              </li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default NavBar;
