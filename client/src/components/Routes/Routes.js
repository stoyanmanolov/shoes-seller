import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../../pages/Home";
import Men from "../../pages/Men";
import Women from "../../pages/Women";
import Kids from "../../pages/Kids";
import Signup from "../../pages/Signup";
import Login from "../../pages/Login";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/men" component={Men} />
          <Route exact path="/women" component={Women} />
          <Route exact path="/kids" component={Kids} />
          <Route exact path="/register">
            {this.props.isLoggedIn ? <Redirect to="/" /> : <Signup />}
          </Route>
          <Route exact path="/login">
            {this.props.isLoggedIn ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(Routes);
