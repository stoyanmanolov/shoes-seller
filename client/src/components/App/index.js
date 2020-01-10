import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Men from "../../pages/Men";
import Women from "../../pages/Women";
import Kids from "../../pages/Kids";
import SignUp from "../../pages/SignUp";
import LogIn from "../../pages/LogIn";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/men" component={Men} />
          <Route exact path="/women" component={Women} />
          <Route exact path="/kids" component={Kids} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
