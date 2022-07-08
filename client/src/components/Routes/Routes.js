import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import AddAdmin from "../../pages/AddAdmin";
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
          <Route exact path="/shoes/add">
            {this.props.isLoggedIn && this.props.user.role === "admin" ? (
              <AddShoes />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/shoes/edit/:id">
            {this.props.isLoggedIn && this.props.user.role === "admin" ? (
              <EditShoe />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/admin/add">
            {this.props.isLoggedIn && this.props.user.role === "admin" ? (
              <AddAdmin />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/orders">
            {this.props.isLoggedIn && this.props.user.role === "admin" ? (
              <Orders />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/shoe/:id" component={Shoe} />
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

export default connect(({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  user: auth.user,
}))(Routes);
