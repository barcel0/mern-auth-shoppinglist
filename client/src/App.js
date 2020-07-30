import React, { useEffect } from 'react';
import NavBar from './Components/NavBar';
import List from './Components/List'
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact><List /></Route>
            <Route path="/register" exact><Register /></Route>
            <Route path="/login" exact><Login /></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
