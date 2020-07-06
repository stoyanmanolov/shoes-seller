import React from "react";
import { connect } from "react-redux";
import { StyledShoesList, List } from "./ShoesList-styles";
import { Dropdown, Loader, Message } from "semantic-ui-react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Pagination } from "@material-ui/lab";
import {
  fetchShoesList,
  clearShoesList,
  setCurrentSort,
} from "../../redux/actions/shoesActions";
import { Link } from "react-router-dom";

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

    return shoes.map(({ _id, brand, model, price, frontImage }, index) => {
      return (
        <Link id={_id.toString()} key={index} to={`/shoe/${_id}`}>
          <Card id={brand}>
            <CardImg
              className="card-image"
              top
              src={"/images/" + frontImage}
              alt="Shoes front image"
            />
            <CardBody>
              <CardTitle>{brand + " " + model}</CardTitle>
              <CardSubtitle style={{ color: "grey" }}>
                {"$" + price}
              </CardSubtitle>
            </CardBody>
          </Card>
        </Link>
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
        <form id="filter-sort">
          <Dropdown
            id="dropdown"
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
          <Message id="error" negative compact>
            {shoesListError.data}
          </Message>
        ) : shoesList.shoes.length === 0 && !shoesListError ? (
          <div id="loader-container" className="loader-container">
            <Loader active inline />
          </div>
        ) : (
          <>
            <List id="list">{this.renderShoesList()}</List>
            <Pagination
              id="pagination"
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
  ({ shoes, errors }) => ({
    shoesList: shoes.shoesList,
    selectedFilters: shoes.filterOptions.selectedFilters,
    shoesListError: errors.shoes.shoesList,
  }),
  {
    fetchShoesList,
    clearShoesList,
    setCurrentSort,
  }
)(ShoesList);
