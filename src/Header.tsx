import React, { useState } from 'react';
import './Header.css'; // Import a CSS file to style the header (create this file)
import { Link } from 'react-router-dom';
import TagCloudPage from './Cloud';

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
              <Link to='/cloud'>Cloud</Link>
            </li> 
            <li>
              <Link to='/search'>Search engine</Link>
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
