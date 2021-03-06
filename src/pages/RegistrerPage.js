import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const RegistrerPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [conformPassword, setConformPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const registerHandler = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setLoading(false);
      toast.success("Registration Success");
    })
    .catch((error) => {
      setLoading(false);
      toast.error("Registration Failed");
    });
  }
  return (
    <div className='register-parent'>
      {loading && <Loader />}
      <div className='register-top'></div>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
        <lottie-player 
          src="https://assets2.lottiefiles.com/packages/lf20_yr6zz3wv.json"
          background="transparent"  
          speed="1"  
          // style="width: 300px; height: 300px;"  
          loop autoplay>
        </lottie-player>
        </div>
        <div className='col-md-4'>
          <div className='register-form'>
            <h2>Register</h2>
            <hr />
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type='text' className='form-control' placeholder='confirm password' value={conformPassword} onChange={(e) => setConformPassword(e.target.value)}/>
            <button className='my-3' onClick={registerHandler}>REGISTER</button>
            <hr />
            <Link className='login-link' to='/login'>Click here to Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrerPage