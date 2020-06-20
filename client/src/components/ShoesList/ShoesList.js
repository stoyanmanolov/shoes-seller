import React from "react";
import { connect } from "react-redux";
import { StyledShoesList, List } from "./ShoesList-styles";
import { Dropdown } from "semantic-ui-react";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Pagination } from "@material-ui/lab";
import { fetchShoesList } from "../../redux/actions/shoesActions";

export class ShoesList extends React.Component {
  state = {
    shoesPerPage: 3,
    sortOptions: [
      { key: "most-recent", value: "most-recent", text: "Most recent" },
      { key: "low-to-high", value: "low-to-high", text: "Price: Low-High" },
      { key: "high-to-low", value: "high-to-low", text: "Price: High-Low" },
    ],
  };

  componentDidMount = () => {
    const currentPage = 1;
    const { fetchShoesList, gender, forKids } = this.props;
    const { shoesPerPage } = this.state;

    fetchShoesList(shoesPerPage, currentPage, gender, forKids);
  };

  renderShoesList = () => {
    const {
      shoesList: { shoes },
    } = this.props;

    if (shoes.length === 0) return null;

    return shoes.map(({ brand, model, price, frontImage }, index) => {
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
    });
  };

  render() {
    const { shoesPerPage, sortOptions } = this.state;
    const { shoesList, fetchShoesList, gender, forKids } = this.props;

    return (
      <StyledShoesList id="shoes-list">
        <form id="filter-sort">
          <Dropdown
            className="dropdown-list"
            options={sortOptions}
            defaultValue={sortOptions[0].value}
            selection
            disabled={true}
          />
        </form>
        <List>{this.renderShoesList()}</List>
        <Pagination
          id="pagination"
          count={shoesList.numOfPages}
          onChange={(e, page) =>
            fetchShoesList(shoesPerPage, page, gender, forKids)
          }
        />
      </StyledShoesList>
    );
  }
}

ShoesList.defaultProps = {
  gender: "All",
  forKids: false,
};

export default connect(({ shoes }) => ({ shoesList: shoes.shoesList }), {
  fetchShoesList,
})(ShoesList);
