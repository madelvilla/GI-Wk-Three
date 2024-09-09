import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Nav.css';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Easy</Link></li>
          <li><Link to="/medium" onClick={() => setIsOpen(false)}>Medium</Link></li>
          <li><Link to="/hard" onClick={() => setIsOpen(false)}>Hard </Link></li>
        </ul>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Nav;
