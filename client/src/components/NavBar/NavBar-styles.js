import styled, { css } from "styled-components";

let lightgrey = "#f3f3f3";
let darkgrey = "#575757";

export const Nav = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas:
    "button logo search-cart"
    "drawer drawer drawer";
  background-color: white;
  align-items: center;
  border-bottom: 1px solid ${lightgrey};
  button {
    display: flex;
  }
  img {
    grid-area: logo;
    margin: auto;
  }
  i {
    font-size: 22px;
    color: black;
  }
  .search-cart {
    grid-area: search-cart;
    align-self: stretch;
    display: flex;
    flex-direction: row;
  }
`;

export const DrawerToggler = styled.button`
  grid-area: button;
  align-self: stretch;
  display: inline-block;
  padding: 0 20px;
  min-width: 59px;
  border: 0;
  background: none;
`;

export const Search = styled.button`
  align-self: stretch;
  padding: 0 20px;
  border: 0;
  background: none;
`;

export const Cart = styled.button`
  align-self: stretch;
  padding: 0 20px;
  border: 0;
  background: none;
`;

export const SearchForm = styled.form`
  display: none;
`;

export const Drawer = styled.div`
  grid-area: drawer;
  align-self: flex-start;
  ${props =>
    props.open
      ? css`
          width: 100%;
          border-top: 1px solid ${lightgrey};
        `
      : css`
          display: none;
          width: 100%;
        `}
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

export const ListItem = styled.li`
  width: 100%;
  a:hover {
    text-decoration: none;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    p {
      color: ${darkgrey};
      font-size: 16px;
      padding: 10px 20px;
      border-bottom: 1px solid ${lightgrey};
    }
  }
`;
