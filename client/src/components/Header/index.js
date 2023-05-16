import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };


  return (
    <header className="mb-4 py-3 display-flex align-center bg-white">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link to="/" >
          <h1 className="m-0 coolheader" style={{
            fontSize: '3rem'}}>
            Lyrassist
          </h1>
        </Link>
        <p className="m-0 subheader">
          Write lyrics based on what you're thinking.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link
                to={`/profile/${Auth.getProfile().data._id}`}
                className="btn btn-lg btn-light m-2"
                style={{
                  backgroundColor: '#cf23cf',
                  color: 'white',
                }}
              >
                Profile
              </Link>
              <button
                className="btn btn-lg btn-light m-2"
                onClick={logout}
                style={{
                  backgroundColor: '#cf23cf',
                  color: 'white',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
                <Link
                  className="btn btn-lg btn-primary m-2"
                  to="/login"
                  style={{
                    backgroundColor: '#cf23cf',
                    color: 'white',
                  }}
                >
                  Login
                </Link>
                <Link
                  className="btn btn-lg btn-light m-2"
                  to="/signup"
                  style={{
                    backgroundColor: '#cf23cf',
                    color: 'white',
                  }}
                >
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
