import styled, { css } from "styled-components";

export const StyledFilterMenu = styled.div`
  ${(props) =>
    props.showOnSmallerScreens &&
    css`
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 1;
      height: 100%;
      width: 100%;
      background-color: white;
    `}

  @media (min-width: 768px) {
    position: initial;
  }
`;

export const MobileWrapper = styled.div`
  margin: 10px 10px 0 10px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const FilterList = styled.ul`
  padding: 10px 30px;

  li {
    list-style-type: none;
  }

  ${(props) =>
    props.showOnSmallerScreens
      ? css`
          width: 100%;
          margin-left: 0;
        `
      : css`
          display: none;
        `}

  @media (min-width: 768px) {
    display: revert;
    width: 200px;
    margin-left: 20px;
    padding: 10px;
  }

  @media (min-width: 992px) {
    width: 300px;
  }
`;

export const FilterSection = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  width: 100%;
  border-bottom: ${({ toggled }) => !toggled && "1px solid lightgrey"};
  cursor: pointer;

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
  }
`;

export const FilterOption = styled.li`
  display: ${(props) => (props.toggled ? "flex" : "none")};

  p {
    margin: 0 10px;
  }

  span {
    color: #575757;
  }
`;
