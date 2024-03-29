import styled from "styled-components";

let lightgrey = "#f3f3f3";
let darkgrey = "#575757";

export const Nav = styled.nav`
  height: 60px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "toggler logo grouped";
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${lightgrey};
  i {
    font-size: 20px;
    color: black;
  }
  @media (min-width: 992px) {
    height: 100px;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas:
      ". logo grouped"
      "navigation navigation navigation";
    justify-content: initial;
  }
`;

export const GroupedButtons = styled.div`
  grid-area: grouped;
  justify-self: flex-end;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    display: inherit;
    border: 0;
    background: none;
    outline: none;
  }
  .cart {
    outline: none;
    margin-left: 10px;
    .cart-items-counter {
      position: absolute;
      background-color: darkorange;
      border-radius: 10px;
      font-size: 10px;
      padding: 0.5px 5px;
      color: white;
      right: 8px;
      top: 13px;
    }
  }
`;

export const Logo = styled.div`
  grid-area: logo;
  justify-self: center;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: center;
  }
`;

export const ListItem = styled.li`
  width: 100%;
  a {
    padding: 10px 20px;
    border-bottom: 1px solid ${lightgrey};
    display: inline-block;
    text-decoration: none;
    color: ${darkgrey};
    font-size: 16px;
    &:hover {
      text-decoration: none;
      color: ${darkgrey};
    }
  }
  @media (min-width: 992px) {
    width: initial;
    a {
      border: 0;
    }
  }
`;
