import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();

  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result);
    navigate('/');
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(username, password);
  }
  return (
    <div className='login'>
      <div className='login_main'>
        <div className='login_text'>Login</div>
        <div className='username'>
          <span>Username</span>
          <input type='text' onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className='password'>
          <span>Password</span>
          <input type='password' onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div className='login_button'>
          <button onClick={handleLogin}>Login</button>
          <span>OR</span>
        </div>
        
        <div className='google'>
          <p>Sign In with Google to Continue</p>
          <button onClick={SignInWithGoogle}>Sign in With Google</button>
        </div>
      </div>

    </div>
  )
}

export default Login