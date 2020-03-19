import React from "react";
import { connect } from "react-redux";
import { StyledShoesList } from "./ShoesList-styles";
import { Pagination } from "@material-ui/lab";
import { fetchShoesList } from "../../redux/actions/shoesActions";

class ShoesList extends React.Component {
  componentDidMount = () => {
    this.props.fetchShoesList(2);
  };

  render() {
    const { numOfPages } = this.props.shoesList;

    return (
      <StyledShoesList id="shoes-list">
        <Pagination count={numOfPages} />
      </StyledShoesList>
    );
  }
}

export default connect(({ shoes }) => ({ shoesList: shoes.shoesList }), {
  fetchShoesList
})(ShoesList);
