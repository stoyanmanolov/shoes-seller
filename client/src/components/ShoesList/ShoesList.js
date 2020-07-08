import React from "react";
import { connect } from "react-redux";
import { StyledShoesList, List } from "./ShoesList-styles";
import { Dropdown, Loader } from "semantic-ui-react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Pagination } from "@material-ui/lab";
import {
  fetchShoesList,
  clearShoesList,
} from "../../redux/actions/shoesActions";

export class ShoesList extends React.Component {
  state = {
    shoesPerPage: 3,
    sortOptions: [
      { key: "most-recent", value: '{ "createdAt": 1 }', text: "Most recent" },
      { key: "low-to-high", value: '{ "price": 1 }', text: "Price: Low-High" },
      { key: "high-to-low", value: '{ "price": -1 }', text: "Price: High-Low" },
    ],
    currentSort: '{ "createdAt": 1 }',
  };

  componentDidMount = () => {
    const currentPage = 1;
    const { fetchShoesList, gender, forKids, selectedFilters } = this.props;
    const { shoesPerPage, currentSort } = this.state;

    fetchShoesList(
      shoesPerPage,
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

    return shoes.map(({ brand, model, price, frontImage }, index) => {
      return (
        <Card id={brand} key={index}>
          <CardImg
            className="card-image"
            top
            src={"/images/" + frontImage}
            alt="Shoes front image"
          />
          <CardBody>
            <CardTitle>{brand + " " + model}</CardTitle>
            <CardSubtitle style={{ color: "grey" }}>{"$" + price}</CardSubtitle>
          </CardBody>
        </Card>
      );
    });
  };

  render() {
    const { shoesPerPage, sortOptions, currentSort } = this.state;
    const {
      shoesList,
      fetchShoesList,
      clearShoesList,
      gender,
      forKids,
      selectedFilters,
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
            onChange={(e, targeted) => {
              this.setState({ currentSort: targeted.value });
              clearShoesList();
              const startingPage = 1;
              fetchShoesList(
                shoesPerPage,
                startingPage,
                gender,
                forKids,
                targeted.value,
                selectedFilters
              );
            }}
          />
        </form>
        {this.props.shoesList.shoes.length === 0 ? (
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
                  shoesPerPage,
                  page,
                  gender,
                  forKids,
                  currentSort,
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
  ({ shoes }) => ({
    shoesList: shoes.shoesList,
    selectedFilters: shoes.filterOptions.selectedFilters,
  }),
  {
    fetchShoesList,
    clearShoesList,
  }
)(ShoesList);
