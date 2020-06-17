import React from "react";
import { connect } from "react-redux";
import { StyledShoesList, List } from "./ShoesList-styles";
import { Dropdown } from "semantic-ui-react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Pagination } from "@material-ui/lab";
import { fetchShoesList } from "../../redux/actions/shoesActions";

class ShoesList extends React.Component {
  state = {
    shoesPerPage: 3,
    sortOptions: [
      { key: "most-recent", value: "most-recent", text: "Most recent" },
      { key: "high-to-low", value: "high-to-low", text: "Price: High-Low" },
      { key: "low-to-high", value: "low-to-high", text: "Price: Low-High" },
    ],
  };

  componentDidMount = () => {
    this.props.fetchShoesList(this.state.shoesPerPage, 1);
  };

  renderShoesList = () => {
    if (this.props.shoesList.shoes.length === 0) return null;
    console.log(this.props.shoesList);

    return this.props.shoesList.shoes.map(
      ({ brand, model, price, frontImage }, index) => {
        return (
          <Card key={index}>
            <CardImg
              className="card-image"
              top
              src={"/images/" + frontImage}
              alt="Shoes front image"
            />
            <CardBody>
              <CardTitle>{brand + " " + model}</CardTitle>
              <CardSubtitle>{"$" + price}</CardSubtitle>
            </CardBody>
          </Card>
        );
      }
    );
  };

  render() {
    const { numOfPages } = this.props.shoesList;

    return (
      <StyledShoesList id="shoes-list">
        <form id="filter-sort">
          <Dropdown
            className="dropdown-list"
            options={this.state.sortOptions}
            defaultValue={this.state.sortOptions[0].value}
            selection
          />
        </form>
        <List>{this.renderShoesList()}</List>
        <Pagination
          count={numOfPages}
          onChange={(event, page) =>
            this.props.fetchShoesList(this.state.shoesPerPage, page)
          }
        />
      </StyledShoesList>
    );
  }
}

export default connect(({ shoes }) => ({ shoesList: shoes.shoesList }), {
  fetchShoesList,
})(ShoesList);
