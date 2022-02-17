import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');

  return (
    <div className='login-parent'>
      <div className='row justify-content-center'>
        <div className='col-md-4'>
          <div className='login-form'>
            <h2>Login</h2>
            <hr />
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='my-3'>LOGIN</button>
            <hr />
            <Link className='register-link' to='/register'>Click here to Register</Link>  
          </div>
        </div>
        <div className='col-md-5'>
          <lottie-player 
            src="https://assets2.lottiefiles.com/packages/lf20_yr6zz3wv.json"
            background="transparent"  
            speed="1"  
            // style="width: 300px; height: 300px;"  
            style={{position:'relative', zIndex:'999' }}
            loop autoplay>
          </lottie-player>
        </div>
      </div>
      <div className='login-bottom'></div>
    </div>
  )
}

export default LoginPage