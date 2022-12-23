import React from "react";
import { connect } from "react-redux";
import { StyledShoesList, List } from "./ShoesList-styles";
import { Dropdown, Loader, Message } from "semantic-ui-react";
import { Pagination } from "@material-ui/lab";
import {
  fetchShoesList,
  clearShoesList,
  setCurrentSort,
} from "../../redux/actions/shoesActions";
import ShoeCard from "./components/ShoeCard";

export class ShoesList extends React.Component {
  state = {
    sortOptions: [
      { key: "most-recent", value: '{ "createdAt": 1 }', text: "Most recent" },
      { key: "low-to-high", value: '{ "price": 1 }', text: "Price: Low-High" },
      { key: "high-to-low", value: '{ "price": -1 }', text: "Price: High-Low" },
    ],
  };

  componentDidMount = () => {
    const currentPage = 1;
    const {
      fetchShoesList,
      gender,
      forKids,
      selectedFilters,
      shoesList,
      setCurrentSort,
    } = this.props;
    const currentSort = this.state.sortOptions[0].value;
    setCurrentSort(currentSort);

    fetchShoesList(
      shoesList.shoesPerPage,
      currentPage,
      gender,
      forKids,
      currentSort,
      selectedFilters
    );
  };

  componentWillUnmount = () => {
    this.props.clearShoesList();
  };

  renderShoesList = () => {
    const {
      shoesList: { shoes },
    } = this.props;

    if (shoes.length === 0) return null;

    return shoes.map((shoe, index) => {
      return (
        <ShoeCard
          key={index}
          shoe={shoe}
          forKids={this.props.forKids}
          gender={this.props.gender}
        />
      );
    });
  };

  render() {
    const { sortOptions } = this.state;
    const {
      shoesList,
      fetchShoesList,
      clearShoesList,
      gender,
      forKids,
      selectedFilters,
      setCurrentSort,
      shoesListError,
    } = this.props;

    return (
      <StyledShoesList id="shoes-list">
        <form>
          <Dropdown
            className="dropdown-list"
            options={sortOptions}
            defaultValue={sortOptions[0].value}
            selection
            onChange={(e, selected) => {
              setCurrentSort(selected.value);
              clearShoesList();
              const startingPage = 1;
              fetchShoesList(
                shoesList.shoesPerPage,
                startingPage,
                gender,
                forKids,
                selected.value,
                selectedFilters
              );
            }}
          />
        </form>
        {shoesListError ? (
          <Message negative compact>
            {shoesListError.data}
          </Message>
        ) : shoesList.shoes.length === 0 && !shoesListError ? (
          <div className="loader-container">
            <Loader active inline />
          </div>
        ) : (
          <>
            <List>{this.renderShoesList()}</List>
            <Pagination
              className="pagination"
              count={shoesList.numOfPages}
              page={shoesList.currentPage}
              onChange={(e, page) => {
                clearShoesList();
                fetchShoesList(
                  shoesList.shoesPerPage,
                  page,
                  gender,
                  forKids,
                  shoesList.currentSort,
                  selectedFilters
                );
              }}
            />
          </>
        )}
      </StyledShoesList>
    );
  }
}

ShoesList.defaultProps = {
  gender: "All",
  forKids: false,
};

export default connect(
  ({ shoes, errors, auth }) => ({
    shoesList: shoes.shoesList,
    selectedFilters: shoes.filterOptions.selectedFilters,
    shoesListError: errors.shoes.shoesList,
    user: auth.user,
    token: auth.token,
  }),
  {
    fetchShoesList,
    clearShoesList,
    setCurrentSort,
  }
)(ShoesList);
