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
          <Route path="/men" component={Men} />
          <Route path="/women" component={Women} />
          <Route path="/kids" component={Kids} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/shoe/:id" component={Shoe} />
          {this.props.isLoggedIn && this.props.user.role === "admin" && (
            <Switch>
              <Route path="/shoes/add" component={AddShoes} />
              <Route path="/shoes/edit/:id" component={EditShoe} />
              <Route path="/orders" component={Orders} />
            </Switch>
          )}
          {!this.props.isLoggedIn && (
            <Switch>
              <Route path="/register" component={Signup} />
              <Route path="/login" component={Login} />
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
