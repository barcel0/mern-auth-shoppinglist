import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

const Register = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();

  useEffect(() => {
    const error = props.error;
    if (error) {
      if (error.id === 'REGISTER_FAIL') {
        setMsg(error.msg.msg);
      } else {
        setMsg(null);
      }
    }
  }, [props.error]);

  const handleInputChange = (field, e) => {
    switch (field) {
      case 'name':
        setName(e.target.value);
        break;
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
    const newUser = { name, email, password };
    //Attempt to register
    props.register(newUser, history);
  }

  return (
    <section>
      <div className="container-column">
        <h2>Create New User</h2>
        {msg ? <span className="alert">{msg}</span> : null}
        <form onSubmit={(e) => handleSubmit(e)} >
          <input type="text" placeholder="Name" name="name" id="name" onChange={(e) => handleInputChange('name', e)}></input>
          <input type="text" placeholder="Email" name="email" id="email" onChange={(e) => handleInputChange('email', e)}></input>
          <input type="password" placeholder="Password" name="password" id="password" onChange={(e) => handleInputChange('password', e)}></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  );

}

Register.propTypes = {
  isAuthenticated: propTypes.bool.isRequired,
  register: propTypes.func.isRequired,
  clearErrors: propTypes.func.isRequired,
  error: propTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register);