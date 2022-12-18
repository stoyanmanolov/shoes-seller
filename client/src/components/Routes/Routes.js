import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../../pages/Home";
import Men from "../../pages/Men";
import Women from "../../pages/Women";
import Kids from "../../pages/Kids";
import AddShoes from "../../pages/AddShoes";
import Signup from "../../pages/Signup";
import Login from "../../pages/Login";
import Shoe from "../../pages/Shoe";
import Cart from "../../pages/Cart";
import Checkout from "../../pages/Checkout";
import Orders from "../../pages/Orders";
import EditShoe from "../../pages/EditShoe";

export class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/men" component={Men} />
          <Route exact path="/women" component={Women} />
          <Route exact path="/kids" component={Kids} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/shoe/:id" component={Shoe} />
          {this.props.isLoggedIn && this.props.user.role === "admin" && (
            <Switch>
              <Route exact path="/shoes/add">
                <AddShoes />
              </Route>
              <Route exact path="/shoes/edit/:id">
                <EditShoe />
              </Route>
              <Route exact path="/shoes/edit/:id">
                <EditShoe />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
            </Switch>
          )}
          {!this.props.isLoggedIn && (
            <Switch>
              <Route exact path="/register">
                <Signup />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  user: auth.user,
}))(Routes);
