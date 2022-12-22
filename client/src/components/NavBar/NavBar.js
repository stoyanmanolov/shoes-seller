import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import NavItems from "./components/NavItems";
import Search from "./components/Search";
import * as Styled from "./NavBar.styles";
import LogoImage from "./images/Logo.png";

export const NavBar = () => {
  const cart = useSelector((state) => state.orders.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const cartItemsCount = cart.reduce(
    (accumulator, cartItem) => accumulator + cartItem.sizes.length,
    0
  );

  const navItems = [
    {
      title: "Men",
      route: "/men",
      isShown: true,
    },
    {
      title: "Women",
      route: "/women",
      isShown: true,
    },
    {
      title: "Kids",
      route: "/kids",
      isShown: true,
    },
    {
      title: "Orders",
      route: "/orders",
      isShown: user?.role === "admin",
    },
    {
      title: "Add shoes",
      route: "/shoes/add",
      isShown: user?.role === "admin",
    },
    {
      title: "Login",
      route: "/login",
      isShown: !isLoggedIn,
    },
    {
      title: "Register",
      route: "/register",
      isShown: !isLoggedIn,
    },
    {
      title: "Logout",
      route: "/",
      onClick: () => dispatch(logoutUser()),
      isShown: isLoggedIn,
    },
  ];

  return (
    <Styled.Nav id="navbar">
      <NavItems>
        <Styled.MenuList>
          {navItems.map((item, index) => {
            if (!item.isShown) return null;

            return (
              <Styled.ListItem key={index}>
                <Link to={item.route} onClick={item?.onClick}>
                  <span>{item.title}</span>
                </Link>
              </Styled.ListItem>
            );
          })}
        </Styled.MenuList>
      </NavItems>
      <Styled.Logo>
        <Link to="/">
          <img src={LogoImage} alt="Logo" />
        </Link>
      </Styled.Logo>
      <Styled.GroupedButtons>
        <Search />
        <Link to="/cart">
          <button className="cart">
            <span className="cart-items-counter">{cartItemsCount}</span>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </Link>
      </Styled.GroupedButtons>
    </Styled.Nav>
  );
};

export default NavBar;
