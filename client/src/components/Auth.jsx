import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signImgae from '../assets/signup.jpg'

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    phone: '',
    avatarURL: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})

    console.log(form)
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {fullName, username, phone, avatarURL, password, confirmPassword} = form;

    // Form validation
    if (isSignup) {
      if (!fullName.trim() || !username.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
        alert('Please fill in all required fields');
        return;
      }
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
    } else {
      if (!username.trim() || !password.trim()) {
        alert('Please fill in username and password');
        return;
      }
    }

    try {
      const URL = `http://localhost:5001/auth`;

      const {data: {token, fullName, userId, hashedPassword}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username, password,  phone, fullName: form.fullName, avatarURL, fullName });

      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      if(isSignup) {
        cookies.set('phone', phone);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }

      window.location.reload();
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.response?.data?.message || 'Authentication failed. Please try again.');
    }
  }
  
  return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p> {isSignup ? 'Sign Up' : 'Sign In'} </p>
          <form onSubmit= {handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullname">Full Name</label>
                <input 
                       name='fullname'
                       type="text" 
                       id='fullname' 
                       placeholder='Full name'
                       onChange={handleChange}
                       />
                       </div>
            )}
             <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">User Name</label>
                <input 
                      name='username'
                       type="text" 
                       id='username' 
                       placeholder='User name'
                       onChange={handleChange}
                       />
                </div>
                {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phone">Phone Number</label>
                <input 
                       name='phone'
                       type="number" 
                       id='phone' 
                       placeholder='Phone Number'
                       onChange={handleChange}
                       />
                       </div>
                )}
                {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input 
                       name='avatarURL'
                       type="text" 
                       id='avatarURL' 
                       placeholder='Avatar URL'
                       onChange={handleChange}
                       />
                       </div>
                )}
                 <div className="auth__form-container_fields-content_input">
                <label htmlFor="password">Password </label>
                <input 
                       name='password'
                       type="password" 
                       id='password' 
                       placeholder='Password'
                       onChange={handleChange}
                       />
                       </div>
                {isSignup && (
                 <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password </label>
                <input 
                       name='confirmPassword'
                       type="password" 
                       id='confirmPassword' 
                       placeholder='Confirm Password'
                       onChange={handleChange}
                       />
                       </div>
                )}   
                <div className="auth__form-container_field-content_button">
                  <button type='submit'> {isSignup ? 'Sign Up' : 'Sign In'} </button>
                </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup ? 'Already have an account? ' : 'Dont have an account? '}
              <span onClick={switchMode}>
                {isSignup ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
            </div>
          <div className="auth__form-container_image">
            <img src={signImgae} alt="Sign" />
          </div>
        </div>
    </div>
  )
}

export default Auth;