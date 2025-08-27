import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import signImgae from '../assets/signup.jpg'

const initialState = {
    fullname: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

      console.log('Sign In');
  }
  
  return (
    <div className='auth__form-container'>
        <div className="auth__form-container_fileds">
        <div className="auth__form-container_fileds-content">
          <p> {isSignup ? 'Sign Up' : 'Sign In'} </p>
          <form onSubmit= {handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fileds-content_input">
                <label htmlFor="name">Full Name</label>
                <input 
                       name='fullname'
                       type="text" 
                       id='fullname' 
                       placeholder='Full name'
                       onChange={handleChange}
                       />
                       </div>
            )}
             <div className="auth__form-container_fileds-content_input">
                <label htmlFor="username">UserName</label>
                <input 
                      name='username'
                       type="text" 
                       id='username' 
                       placeholder='User ame'
                       onChange={handleChange}
                       />
                </div>
                {isSignup && (
              <div className="auth__form-container_fileds-content_input">
                <label htmlFor="name">Phone Number</label>
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
              <div className="auth__form-container_fileds-content_input">
                <label htmlFor="avatar">Avatar URL</label>
                <input 
                       name='avatarURL'
                       type="text" 
                       id='avatar' 
                       placeholder='Avatar URL'
                       onChange={handleChange}
                       />
                       </div>
                )}
                 <div className="auth__form-container_fileds-content_input">
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
                 <div className="auth__form-container_fileds-content_input">
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
          <div className="auth__form-container_fileds-account">
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