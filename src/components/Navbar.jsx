import React, { useState, Suspense } from 'react';
import axios from 'axios';

import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import  { useEffect } from 'react';
const Buildnbrfromtoken = localStorage.getItem("Buildnbrfromtoken");
const userId = localStorage.getItem("idfromtoken");
const buildupdate = Number(Buildnbrfromtoken) + 100 ;
const Navbar = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [showProjectList, setShowProjectList] = useState(false);

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
        axios.put('http://localhost:9090/updateUserBuildings', {
                            userId: userId,
                            Buildnbr: (Number(Buildnbrfromtoken) + 100)
                 }, {
                  headers: {
                      'Content-Type': 'application/json'
                }
                    });


       

      } else {
        // Handle other possible response statuses/error scenarios
        window.alert("Payment failed. Please try again.");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };
  const handleLogout = () => {
    
    setShowProjectList(false);
    localStorage.clear();
    history.push('/login');
   
  };
 

  const handleLogin = () => {
    if (localStorage.getItem('idfromtoken') !== null) {
      setShowProjectList(true);

    }
  };

  useEffect(() => {
    handleLogin();
  }, [handleLogin]);



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">{t('Home')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">{t('About')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/service">{t('Services')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">{t('Contact')}</NavLink>
              </li>

              {showProjectList ? (
                
                <><li className="nav-item">
                  <NavLink className="nav-link" to="/ProjectList">{t('ProjectList')}</NavLink>
                </li><li className="nav-item">
                <a className="nav-link" onClick={handlePayment}>Billing</a>
                                  </li></>

                
                
              ) : null}
              <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/">Documentation</a>

        </li>
            </ul>

            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">{t('BUILD-LAB')}</NavLink>
                
            {(location.pathname === '/dashboard' || location.pathname === '/ProjectList' || location.pathname === '/SettingsPage' || location.pathname === '/invitation'
              || location.pathname === '/' || location.pathname === '/about' || location.pathname === '/service'  || location.pathname === '/Profile' || location.pathname === '/PaymentValidate' || location.pathname.match(/^\/info\/(.*)$/)

              // eslint-disable-next-line no-mixed-operators
              || location.pathname === '/contact')   && showProjectList ?  (
                
              <>
                   

                <NavLink to="/Profile" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-cog"></i> {t('Profile')}
                </NavLink>
                <NavLink to="/SettingsPage" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-cog"></i> {t('Settings')}
                </NavLink>
             
                <button className="btn btn-outline-primary ms-2 px-4 rounded-pill" onClick={handleLogout}>
                  <i className="fa fa-sign-out"></i> {t('Logout')}
                </button>
              </>
                
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                  <i className="fa fa-sign-in me-2"></i>{t('Login')}
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-user-plus me-2"></i>{t('Register')}
                </NavLink>
                <NavLink to="/chat" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
                  <i className="fa fa-comment"></i> {t('Chatbot')}
                </NavLink>
              </>
            )}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
