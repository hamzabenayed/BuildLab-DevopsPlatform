import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import useLocalStorage from 'use-local-storage'
import { Alert } from "reactstrap";

import { GoogleLogin } from "react-google-login";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';


const clientId = "151877856440-ppcj77ol630skcs9aetaa4eg2pcv4a1o.apps.googleusercontent.com"


const HandleGithubLogin = () => {
  const clientId = 'YOUR_GITHUB_CLIENT_ID';
  const redirectUri = 'http://localhost9090/';
  const scope = 'user';

  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;


  window.location.href = url;
}


const Login = () => {
  const { t, i18n } = useTranslation();
  

  const onSuccess = (res) => {
    console.log("Login Success! Current User: ", res.profileObj);
    toast.success("Connection successful!");
    history.push('/dashboard');
  }
  
  
  const onFailure = (res) => {
    console.log("Login Failed! res: ", res);
  }
  
  // const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')

  // const switchTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme)
  // }


  const history = useHistory()

  // Handle Payment
  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:8084/create-checkout-session', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Add payment related data here, e.g. payment amount, currency, etc.
        body: JSON.stringify({
          // Add payment related data here, e.g. payment amount, currency, etc.
        })
      });

      if (res.status === 200) {
        const session = await res.json(); // Assuming the response returns a session object
        window.location.href = session.url; // Redirect to session URL
      } else {
        // Handle other possible response statuses/error scenarios
        window.alert("Payment failed. Please try again.");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const GoogleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };
  const [error, setError] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
    token: ''
  });

  // Handle Input
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    setUser({ ...user, [name]: value })
  }

  // Handle Login
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    try {
      const res = await fetch('/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (res.status === 401 || !res) {
        //window.alert("Invalid Credentials")
        setError(true)

      } else if (res.status === 200) {

        // window.alert("Login Successfull");

        const data = await res.json();
        localStorage.setItem("email", data.emailfromtoken); // Save email in local storage

        localStorage.setItem("idfromtoken", data.idfromtoken);
        localStorage.setItem("emailfromtoken", data.emailfromtoken);
        localStorage.setItem("Buildnbrfromtoken", data.Buildnbrfromtoken);
        history.push('/ProjectList');


        // Token is generated When we Logged In.
        // Now we need to create Schema for Messages
      }

    } catch (error) {
      console.log(error);

    }
  }




  return (
    <div>

      {
        error && <Alert color="danger">
          Invalid Email or Password !!
        </Alert>

      }



      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/register"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Register
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">LOGIN</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={user.Email}
                  onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">

                <Link to="/ForgotPassword" className="btn btn-link">
                  Forgot password
                </Link>
              </div>
              <div className="mb-3 ">


              <Link to="/TermsAndConditions" className="btn btn-link">
                  {t('Terms And Conditions')}
                </Link>

               
                <button className="btn btn-link" onClick={handlePayment}>
                  {t('Payment')}
                </button>

              </div>

              <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">

                Login

              </button>

              <center>
                <div className="form-text" >
                  Or you can
                </div>
              </center>

              <div id="signInButton" className={styles.google_btn}>
                <GoogleLogin 
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={false}
                  prompt='select_account'
                />

              </div>
              <button type="submit" className={styles.google_btn}>
                <img src="./assets/Github.png" alt="google icon" onClick={HandleGithubLogin} />
                <span>Sign in with Github</span>
              </button>



            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


