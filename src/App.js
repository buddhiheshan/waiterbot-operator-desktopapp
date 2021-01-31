import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './pages/LoginComponent';
import Layout from './component/LayoutComponent';

import '../src/App.css';



class App extends Component {
  componentDidMount() {
    console.log("mounted app");
  }
  componentDidUpdate() {
    console.log("update app");
  }


  render() {
    console.log("render app")
    return (
      <div className="App">
        {
        !localStorage.getItem('token') ?
          (<Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>) :
          <Layout />
        }
      </div >

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
