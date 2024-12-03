import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {

  return (
    <div className='welcome-page-container'>
      <h1 className='welcome-page-title'>MR. Banana</h1>
      <p className='welcome-page-sub-title'>KNOWLEDGE CHECKER GAME</p>
      <Link to='/login' className='welcome-page-play-button'>PLAY NOW</Link>
    </div>
  );
}

export default WelcomePage;