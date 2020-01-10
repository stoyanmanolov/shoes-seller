import React from "react";
import { Link } from "react-router-dom";
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
        <Drawer open={this.state.drawerOn}>
          <MenuList>
            <ListItem>
              <Link to="/men">
                <p>Men</p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/women">
                <p>Women</p>
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/kids">
                <p>Kids</p>
              </Link>
            </ListItem>
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
          </MenuList>
        </Drawer>
      </Nav>
    );
  }
}

export default NavBar;
