import React, { useEffect } from "react";
import * as Styled from "./ShoesList.styles";
import { Loader, Message } from "semantic-ui-react";
import {
  fetchShoesList,
  setCurrentPage,
  setCurrentSort,
} from "../../redux/actions/shoesActions";
import ShoeCard from "./components/ShoeCard";
import { useSelector, useDispatch } from "react-redux";

export const ShoesList = ({ gender = "All", forKids = false }) => {
  const sortOptions = [
    { key: "most-recent", value: '{ "createdAt": 1 }', text: "Most recent" },
    { key: "low-to-high", value: '{ "price": 1 }', text: "Price: Low-High" },
    { key: "high-to-low", value: '{ "price": -1 }', text: "Price: High-Low" },
  ];
  const shoesList = useSelector((state) => state.shoes.shoesList);
  const currentSort = useSelector((state) => state.shoes.shoesList.currentSort);
  const currentPage = useSelector((state) => state.shoes.shoesList.currentPage);
  const selectedFilters = useSelector(
    (state) => state.shoes.filterOptions.selectedFilters
  );
  const shoesListError = useSelector((state) => state.errors.shoes.shoesList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShoesList(gender, forKids));
  }, [currentSort, currentPage, selectedFilters]);

  const renderShoesList = () => {
    return shoesList.shoes.map((shoe, index) => (
      <ShoeCard key={index} shoe={shoe} />
    ));
  };

  return (
    <Styled.ShoesList id="shoes-list">
      <Styled.Dropdown
        className="dropdown-list"
        options={sortOptions}
        defaultValue={sortOptions[0].value}
        selection
        onChange={(e, selected) => {
          dispatch(setCurrentSort(selected.value));
        }}
      />
      {shoesListError ? (
        <Message negative compact>
          {shoesListError.data}
        </Message>
      ) : shoesList.shoes.length === 0 && !shoesListError ? (
        <Loader active />
      ) : (
        <>
          <Styled.List>{renderShoesList()}</Styled.List>
          <Styled.Pagination
            count={shoesList.numOfPages}
            page={shoesList.currentPage}
            onChange={(e, page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </Styled.ShoesList>
  );
};

export default ShoesList;
