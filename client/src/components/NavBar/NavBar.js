import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import NavItems from "./components/NavItems";
import Search from "./components/Search";
import { Nav, Logo, GroupedButtons, MenuList, ListItem } from "./NavBar-styles";
import LogoImage from "./images/Logo.png";

export class NavBar extends React.Component {
  renderStaticItems = () => {
    const listItems = [
      { title: "Men", route: "/men" },
      { title: "Women", route: "/women" },
      { title: "Kids", route: "/kids" },
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
              <>
                <ListItem>
                  <Link to="/orders">
                    <p>Orders</p>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/shoes/add">
                    <p>Add shoes</p>
                  </Link>
                </ListItem>
              </>
            ) : null}
            <ListItem id="logout" onClick={(e) => this.props.logoutUser()}>
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
      <Nav id="navbar">
        <NavItems>{this.renderNavItems()}</NavItems>
        <Logo>
          <Link to="/">
            <img src={LogoImage} alt="Logo" />
          </Link>
        </Logo>
        <GroupedButtons>
          <Search />
          <Link to="/cart">
            <button className="cart">
              <span id="cart-items-counter" className="cart-items-counter">
                {this.props.itemsCount}
              </span>
              <i className="fas fa-shopping-cart"></i>
            </button>
          </Link>
        </GroupedButtons>
      </Nav>
    );
  }
}

export default connect(
  ({ auth, orders }) => ({
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    itemsCount: orders.itemsCount,
  }),
  {
    logoutUser,
  }
)(NavBar);
