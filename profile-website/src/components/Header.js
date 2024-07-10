import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="background-image"></div>
      <div className="profile-info">
      <div className="profile-pic"></div>
        <h1>Luke Janse van Rensburg</h1>
        <p>Software developer / data analyst</p>
      </div>
    </header>
  );
}

export default Header;
