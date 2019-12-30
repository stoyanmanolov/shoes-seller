import React from "react";
import {
  Nav,
  DrawerToggler,
  Search,
  Cart,
  Drawer,
  SearchForm,
  MenuList,
  ListItem
} from "./styles";
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
          {// If the Drawer is on the Toggler will turn into an X
          this.state.drawerOn ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </DrawerToggler>
        <img src={Logo} alt="Logo" />
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
              <a href="#home">
                <p>Men</p>
              </a>
            </ListItem>
            <ListItem>
              <a href="#home">
                <p>Women</p>
              </a>
            </ListItem>
            <ListItem>
              <a href="#home">
                <p>Children</p>
              </a>
            </ListItem>
            <ListItem>
              <a href="#home">
                <p>Log in</p>
              </a>
            </ListItem>
            <ListItem>
              <a href="#home">
                <p>Sign up</p>
              </a>
            </ListItem>
          </MenuList>
        </Drawer>
      </Nav>
    );
  }
}

export default NavBar;
