import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from './providers/UserProvider';
import { useHistory } from 'react-router-dom';
import { FaFacebookSquare, FaGoogle } from 'react-icons/fa';
import { signInWithFacebook, signInWithGoogle } from './services/firebase';

function Login() {
  const user = useContext(UserContext);
  let history = useHistory();
  const [redirect, setredirect] = useState(null);
  useEffect(() => {
    console.log(user);
    if (user != null) {
      setredirect('/dashboard');
    }
  }, [user]);
  if (redirect) {
    history.push(redirect);
  }
  return (
    <div>
      <section className="section">
        <div className="container mt-5">
          <div className="col-md-6 d-flex flex-column">
            <p className="small text-center text-gray-soft">
              Sign in using Social login
            </p>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => signInWithGoogle()}
            >
              <FaGoogle />
              {'  '}
              Sign in with Google
            </button>
            <button
              type="button"
              className="btn btn-outline-info mt-2"
              onClick={() => signInWithFacebook()}
            >
              <FaFacebookSquare />
              {'  '}
              Sign in with Facebook
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
