import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const email = localStorage.getItem('email');
        if (email !== null) { // check if email is not null
          const response = await fetch(`/getUserByEmail/${email}`);
          const data = await response.json();
          setUser(data.user);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUsernameChange = (event) => {
    setUser({ ...user, userName: event.target.value });
  };

  const handleEmailChange = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  return (
    <div  className="container my-5">
      <div className="row justify-content-center" style={{marginBottom:"40%"}}>
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Profile</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" name="username" value={user.userName || ''} onChange={handleUsernameChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={user.email || ''} onChange={handleEmailChange} />
                </div>
              
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">Save Changes</button>
                  <Link to="/ProjectList" className="btn btn-secondary">Return</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
