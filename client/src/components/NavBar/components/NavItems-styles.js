import styled, { css } from "styled-components";

let lightgrey = "#f3f3f3";

export const DrawerToggler = styled.button`
  grid-area: toggler;
  justify-self: flex-start;
  display: inherit;
  border: 0;
  background: none;
  margin-left: 20px;
  :focus {
    outline: none;
  }
  @media (min-width: 992px) {
    display: none;
  }
`;

export const StyledNavItems = styled.div`
  position: absolute;
  top: 100%;
  background-color: white;
  z-index: 1;
  ${(props) =>
    props.open
      ? css`
          width: 100%;
          border-top: 1px solid ${lightgrey};
        `
      : css`
          display: none;
          width: 100%;
        `}
  @media (min-width: 992px) {
    position: initial;
    grid-area: navigation;
    display: initial;
  }
`;
