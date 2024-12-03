import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/api/signup", {
      username,
      email,
      password
    })
    .then(response => {
      if(response.data.status){
        navigate('/login');
      }
    })
    .catch(err =>{
      console.log(err);
    })

  }

  return (
    <div className='sign-up-page-wrapper'>
        <form onSubmit={handleSubmit}>
            <h1 className='sign-up-page-title'>Sign Up</h1>
            <div className="sign-up-page-input-box">
                <FaUser className='sign-up-page-icon'/>
                <input type="text" placeholder='Enter your username' className='sign-up-page-input-field' onChange={(e) => setUsername(e.target.value)}/>
            </div>

            <div className="sign-up-page-input-box">
                <MdEmail className='sign-up-page-icon' style={{fontSize: '21px'}}/>
                <input type="text" placeholder='Enter your email' className='sign-up-page-input-field' onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="sign-up-page-input-box">
               <FaLock className='sign-up-page-icon'/> 
               <input type="password" placeholder='Enter your password' className='sign-up-page-input-field' onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <button type='submit' className='sign-up-page-btn'>Sign Up</button>

        </form>

        <div className="login-page-prompt">
          Already a member ? <Link to='/login'>Sign in here</Link>
        </div>
    </div>
  );
}

export default SignUpPage;