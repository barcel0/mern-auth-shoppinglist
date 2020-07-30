import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();

  useEffect(() => {
    const error = props.error;
    if (error) {
      if (error.id === 'LOGIN_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }
  }, [props.error]);

  const handleInputChange = (field, e) => {
    switch (field) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        return true;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //Attempt to login
    props.login({ email, password }, history);
  }

  return (
    <section>
      <div className="container-column">
        <h2>User Login</h2>
        {msg ? <span className="alert">{msg}</span> : null}
        <form onSubmit={(e) => handleSubmit(e)} >
          <input type="text" placeholder="Email" name="email" id="email" onChange={(e) => handleInputChange('email', e)}></input>
          <input type="password" placeholder="Password" name="password" id="password" onChange={(e) => handleInputChange('password', e)}></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );

}

Login.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  login: propTypes.func.isRequired,
  clearErrors: propTypes.func.isRequired,
  error: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login);