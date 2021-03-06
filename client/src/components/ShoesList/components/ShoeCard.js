import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { Button } from "semantic-ui-react";
import {
  fetchShoesList,
  clearShoesList,
} from "../../../redux/actions/shoesActions";

export class ShoeCard extends React.Component {
  deleteShoe = async (id) => {
    const {
      shoesList: { currentPage, currentSort, shoesPerPage },
      fetchShoesList,
      clearShoesList,
      selectedFilters,
      token,
      gender,
      forKids,
    } = this.props;

    await axios
      .delete(`/shoes/${id}`, {
        headers: {
          "X-Auth-Token": token,
        },
      })
      .then((response) => {
        window.alert(response.data.message);
        clearShoesList();
        fetchShoesList(
          shoesPerPage,
          currentPage,
          gender,
          forKids,
          currentSort,
          selectedFilters
        );
      })
      .catch((error) => window.alert(error.response.statusText));
  };

  render() {
    const {
      shoe: { _id, brand, price, model, frontImage },
      user,
    } = this.props;

    return (
      <Link id={_id.toString()} to={`/shoe/${_id}`}>
        <Card id={model}>
          <CardImg
            className="card-image"
            top
            src={"/images/" + frontImage}
            alt="Shoes front image"
          />
          <CardBody>
            <CardTitle>{brand + " " + model}</CardTitle>
            <CardSubtitle style={{ color: "grey" }}>
              {"$" + price.toFixed(2)}
            </CardSubtitle>
            {user && user.role === "admin" && (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  this.deleteShoe(_id);
                }}
                negative
              >
                Delete
              </Button>
            )}
          </CardBody>
        </Card>
      </Link>
    );
  }
}

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
  }
)(ShoeCard);
