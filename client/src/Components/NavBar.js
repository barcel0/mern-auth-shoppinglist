import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { logout } from '../actions/authActions';
import propTypes from 'prop-types';

const NavBar = (props) => {

  const serveAuthLinks = () => {
    if (!props.auth.isAuthenticated) {
      return (
        <ul>
          <li><Link to='/login' onClick={() => props.clearErrors()}>Login</Link></li>
          <li><Link to='/register' onClick={() => props.clearErrors()}>Register</Link></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>Welcome back {props.auth.user.name}!</li>
          <li><Link to='#' onClick={props.logout}>Logout</Link></li>
        </ul>
      );
    }
  }

  return (
    <div>
      <header>
        <h1 ><Link to='/' onClick={() => props.clearErrors()}>BORING SHOPPING LIST</Link></h1>
        {serveAuthLinks()}
      </header>
      <nav>The main purpose of this MERN app is to create a basic JWT based authentication system and learn some Redux.</nav>
    </div>
  );
}

NavBar.propTypes = {
  clearErrors: propTypes.func.isRequired,
  logout: propTypes.func.isRequired,
  error: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  error: state.error,
  auth: state.auth
})

export default connect(mapStateToProps, { clearErrors, logout })(NavBar);

