import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import {
  Nav,
  DrawerToggler,
  Search,
  Cart,
  Drawer,
  SearchForm,
  MenuList,
  ListItem
} from "./NavBar-styles";
import Logo from "./images/Logo.png";

class NavBar extends React.Component {
  state = { drawerOn: false };

  toggleDrawer = e => {
    if (!this.state.drawerOn) {
      this.setState({ drawerOn: true });
    } else this.setState({ drawerOn: false });
  };

  renderNavItems = () => {
    const renderStatic = () => {
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

    const renderAuth = () => {
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
              <ListItem onClick={e => this.props.logoutUser()}>
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

    return (
      <MenuList>
        {renderStatic()}
        {renderAuth()}
      </MenuList>
    );
  };

  render() {
    return (
      <Nav>
        <DrawerToggler onClick={e => this.toggleDrawer(e)}>
          {/* If the Drawer is on the Toggler will turn into an X */}
          {this.state.drawerOn ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </DrawerToggler>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
        {/* Grouping the search and cart buttons together */}
        <div className="search-cart">
          <Cart>
            <i className="fas fa-shopping-cart"></i>
          </Cart>
          <Search>
            <i className="fas fa-search"></i>
          </Search>
        </div>
        <SearchForm>
          <input type="text" placeholder="Search"></input>
        </SearchForm>
        <Drawer open={this.state.drawerOn}>{this.renderNavItems()}</Drawer>
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
