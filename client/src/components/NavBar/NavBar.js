import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import NavItems from "./components/NavItems";
import {
  Nav,
  Logo,
  GroupedButtons,
  SearchForm,
  MenuList,
  ListItem
} from "./NavBar-styles";
import LogoImage from "./images/Logo.png";

export class NavBar extends React.Component {
  renderStaticItems = () => {
    const listItems = [
      { title: "Men", route: "/men" },
      { title: "Women", route: "/women" },
      { title: "Kids", route: "/kids" }
    ];

    return listItems.map(({ title, route }, index) => {
      return (
        <ListItem key={index}>
          <Link to={route}>
            <p>{title}</p>
          </Link>
        </ListItem>
      );
    });
  };

  renderAuthItems = () => {
    const { isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn ? (
          <>
            {this.props.user.role === "admin" ? (
              <ListItem>
                <Link to="/shoes/add">
                  <p>Add shoes</p>
                </Link>
              </ListItem>
            ) : null}
            <ListItem id="logout" onClick={e => this.props.logoutUser()}>
              <Link to="/">
                <p>Log out</p>
              </Link>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Link to="/login">
                <p>Log in</p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/register">
                <p>Sign up</p>
              </Link>
            </ListItem>
          </>
        )}
      </>
    );
  };

  renderNavItems = () => {
    return (
      <MenuList>
        {this.renderStaticItems()}
        {this.renderAuthItems()}
      </MenuList>
    );
  };

  render() {
    return (
      <Nav>
        <NavItems>{this.renderNavItems()}</NavItems>
        <Logo>
          <Link to="/">
            <img src={LogoImage} alt="Logo" />
          </Link>
        </Logo>
        <GroupedButtons>
          <button className="search">
            <i className="fas fa-search"></i>
          </button>
          <button className="cart">
            <i className="fas fa-shopping-cart"></i>
          </button>
        </GroupedButtons>
        <SearchForm>
          <input type="text" placeholder="Search"></input>
        </SearchForm>
      </Nav>
    );
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user, isLoggedIn: auth.isLoggedIn }),
  {
    logoutUser
  }
)(NavBar);
