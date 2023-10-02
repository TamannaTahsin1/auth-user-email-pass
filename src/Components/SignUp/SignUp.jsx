import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../FIrebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const SignUp = () => {
    // all state
    const [registerError, setRegisterError] = useState('')
    const[registerSuccess, setRegisterSuccess] = useState('')
    const[showPassword, setShowPassword] = useState(false)

    // event handler for submit  
    const handleRegister = e =>{
        // preventDefault to prevent loading
        e.preventDefault()

        // to get value from input field
        console.log('form')
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted)

        // set an error message validation 
        if(password.length < 6){
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Password should have at least one upper case character');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accepted our terms and conditions');
            return;
        }


        // reset error and success 
        setRegisterError('')
        setRegisterSuccess('')

        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            console.log(result.user)
            setRegisterSuccess('User created successfully.')
            // update profile
            updateProfile(result.user,{
                displayName: name,
                photoURL: "https://example.com/jane-q-user/profile.jpg"
            })
            .then(() =>{
                console.log('profile updated')
            })
            .catch(error =>{
                console.log(error.message)
            })
            // send verification email
            sendEmailVerification(result.user)
            .then(() =>{
                alert("Please check your email and verify your account")
            })
        })
        .catch(error =>{
            console.error(error)
            setRegisterError(error.message)
        })
    }
  return (
    <div>
      <div className='hero min-h-screen bg-base-200'>
        <div className='hero-content flex-col '>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold text-center'>Register now!</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
            <form onSubmit={handleRegister}>
            <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Name</span>
                </label>
                <input
                  type='text'
                  name="name"
                  placeholder='Your Name'
                  className='input input-bordered'
                  required
                />
              </div>
            <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name="email"
                  placeholder='Your Email'
                  className='input input-bordered'
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder='password'
                  className='input input-bordered w-full'
                  required
                />
                <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
                </div>
              </div>
              <input type="checkbox" name="terms" id="terms" />
              <label className="ml-2" htmlFor="terms">Accept our terms and conditions</label>
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Register</button>
              </div>
            </form>
            {
                registerError && <p className="text-red-600">{registerError}</p>
            }
            {
                registerSuccess && <p className="text-green-600">{registerSuccess}</p>
            }
            <p>Already have an account? <Link to='/login'><span className="text-blue-500">Log In</span></Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
