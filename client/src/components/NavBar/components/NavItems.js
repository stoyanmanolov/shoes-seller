import React from "react";
import { DrawerToggler, StyledNavItems } from "./NavItems-styles";

class NavItems extends React.Component {
  state = { drawerOn: false };

  toggleDrawer = (e) => {
    if (!this.state.drawerOn) {
      this.setState({ drawerOn: true });
    } else this.setState({ drawerOn: false });
  };

  render() {
    return (
      <>
        <DrawerToggler onClick={(e) => this.toggleDrawer(e)}>
          {/* If the Drawer is on the Toggler will turn into an X */}
          {this.state.drawerOn ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-bars"></i>
          )}
        </DrawerToggler>
        <StyledNavItems open={this.state.drawerOn}>
          {this.props.children}
        </StyledNavItems>
      </>
    );
  }
}

export default NavItems;
