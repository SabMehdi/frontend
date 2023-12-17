import React, { useState } from 'react';
import './Header.css'; // Import a CSS file to style the header (create this file)
import { Link } from 'react-router-dom';
import TagCloudPage from './Cloud';
import { ReactComponent as LogoSvg } from './logo-p8.svg'; // Adjust the path to your SVG file

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
            <Link to="/"><LogoSvg className="logo-svg" /></Link>
            </li>
            <li>
              <Link to='/cloud'>Nuage de mots</Link>
            </li>
            <li>
              <Link to='/search'>Moteur de recherche</Link>
            </li>
            <li>
              <Link to='/GlobalCloud'>Nuage de mots global</Link>
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
