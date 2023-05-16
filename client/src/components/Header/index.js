import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const styleboi = {
    backgroundImage: 'linear-gradient(to right, #4287f5, #ff69b4)'
  }

  return (
    <header className="mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link to="/" >
          <h1 className="m-0 coolheader" style={{
            fontSize: '3rem'}}>
            Lyrassist
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Write lyrics based on what you're thinking.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to={`/profile/${Auth.getProfile().data._id}`} className="btn btn-lg btn-light m-2" >
                Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
