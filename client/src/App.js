import React from 'react';
import "./css/styles.css";
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/pages/Home';
import Post from './components/pages/Post';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import AuthState from './context/auth/AuthState';
import PostState from './context/posts/PostState';

const App = (props) => {
  return (
    <AuthState>
      <PostState>
        <Router>
          <div className="container">
            <Navbar />
          </div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/post/:id' component={Post} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
      </PostState>
    </AuthState>
  );
}

export default App;
