import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t, i18n } = useTranslation();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = { userName, email, password };
    try {
      const res = await axios.post('/register', newUser);
      console.log(res.data);
      localStorage.setItem("email", email);
      history.push('/'); // navigate to the next page
    } catch (err) {
      console.log(err);
    }
  };

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate the form fields

    let errors = {};
    if (userName.trim() === '') {
      errors.username = 'Username is required';
    }
    if (email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (password.trim() === '') {
      errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }


    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    handleRegister(event);
  };

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">{t('Hi, There')}</h1>
            <p className="lead text-center">{t('Enter Your Details to Register')}</p>
            <h5 className="mb-4">OR</h5>
            <NavLink
              to="/login"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              {t('Login')}
            </NavLink>
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={handleSubmit} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {t('Username')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span>{errors.username}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  {t('Email address')}
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  {t('Password')}
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span>{errors.password}</span>}
              </div>
              <div className="mb-3">
  <label htmlFor="exampleInputConfirmPassword1" className="form-label">
    {t('Confirm Password')}
  </label>
  <input
    type="password"
    className="form-control"
    id="exampleInputConfirmPassword1"
    name="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
</div>

              <button type="submit" className="btn btn-primary w-100">
                {t('Register')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
