import {auth, provider} from '../../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const SignInWithGoogle = async() => {
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        navigate('/');
    }
  return (
    <div>
        <p>Sign In with Google to Continue</p>
        <button onClick={SignInWithGoogle}>Sign in With Google</button>
    </div>
  )
}

export default Login