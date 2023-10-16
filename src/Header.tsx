import React, { useState } from 'react';
import './Header.css'; // Import a CSS file to style the header (create this file)

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div className="menu-icon" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'change' : ''}`}></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
