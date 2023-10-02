import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FIrebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // all state
  const [logInError, setLogInError] = useState("");
  const [logInSuccess, setLogInSuccess] = useState("");
  const emailRef = useRef(null)

  // event handler for submit
  const handleLogin = (e) => {
    e.preventDefault();

    // to get value from input field
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // set an error message validation
    if (password.length < 6) {
      setLogInError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setLogInError("Password should have at least one upper case character");
      return;
    }

    // reset error and success
    setLogInError('');
    setLogInSuccess('');

    // create user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if(result.user.emailVerified){
            setLogInSuccess('User logged in successfully')
        }
        else{
            alert('Please verify your email')
        }
      })
      .catch((error) => {
        console.error(error);
        setLogInError(error.message);
      });
  };
  
        //event handler for forget password button
        const handleForgetPassword= () =>{
            const email = emailRef.current.value;
            if(!email){
                console.log('Please provide an email', emailRef.current.value)
                return;
            }         
           else if(!/[A-Z]/.test(email)){
            console.log('Please write a valid email')
            return
           }

        // send validation email
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            console.log('Please check your email')
        })
        .catch(error=>{
            console.log(error.message)
        }) 
        }

  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col '>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold text-center mb-8'>Login now!</h1>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
              <form onSubmit={handleLogin}>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input
                    type='email'
                    placeholder='email'
                    ref={emailRef}
                    className='input input-bordered'
                    name='email'
                  />
                </div>
                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <input
                    type='password'
                    placeholder='password'
                    className='input input-bordered'
                    name='password'
                  />
                  <label className='label'>
                    <a onClick={handleForgetPassword} href='#' className='label-text-alt link link-hover'>
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className='form-control mt-6'>
                  <button className='btn btn-primary'>Login</button>
                </div>
              </form>
              {/* condition text for error */}
              {logInError && <p className='text-red-600'>{logInError}</p>}
              {logInSuccess && <p className='text-green-600'>{logInSuccess}</p>}
              <p>New Here?<Link to='/signUp'><span className="text-blue-500 ml-2">Register</span></Link> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
