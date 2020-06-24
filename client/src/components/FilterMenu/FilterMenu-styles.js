import styled, { css } from "styled-components";

export const StyledFilterMenu = styled.div`
  .filter-button {
    margin: 0px;
    width: 100%;
  }
  @media (min-width: 768px) {
    position: initial;
    .button-wrapper {
      display: none;
    }
  }
  ${(props) =>
    props.showOnSmallerScreens
      ? css`
          position: absolute;
          top: 0;
          z-index: 1;
          height: 100%;
          width: 100%;
          background-color: white;
          .filter-button {
            display: none;
          }
          .filter-topbar {
            display: flex;
            h3 {
              width: 100%;
              margin: 20px 0 0 0;
              text-align: center;
            }
            i {
              position: absolute;
              top: 0;
              right: 0;
              margin: 20px 30px 0 0;
              font-size: 25px;
            }
          }
        `
      : css`
          .button-wrapper {
            margin: 10px 10px 0 10px;
            i,
            h3 {
              display: none;
            }
          }
        `}
`;

export const FilterList = styled.ul`
  padding: 10px 30px;
  ${(props) =>
    props.showOnSmallerScreens
      ? css`
          width: 100%;
          margin-left: 0;
        `
      : css`
          display: none;
        `}
  li {
    list-style-type: none;
  }
  @media (min-width: 768px) {
    display: inherit;
    width: 200px;
    margin-left: 20px;
    padding: 10px;
  }
  @media (min-width: 992px) {
    width: 300px;
  }
`;

export const FilterSection = styled.li`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-areas:
    "title icon"
    "info info";
  padding: 15px 0;
  width: 100%;
  border-bottom: ${({ clicked }) => !clicked && "1px solid lightgrey"};
  cursor: pointer;
  .title {
    margin: 0;
    grid-area: title;
    font-size: 16px;
    font-weight: 700;
  }
  .chevron {
    grid-area: icon;
  }
  :last-child {
    border: 0;
  }
`;

export const FilterOption = styled.li`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  .title {
    margin: 0 10px;
  }
  .count {
    color: #575757;
  }
`;
