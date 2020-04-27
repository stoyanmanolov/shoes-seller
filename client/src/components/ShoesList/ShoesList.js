import React from "react";
import { connect } from "react-redux";
import { StyledShoesList } from "./ShoesList-styles";
import { Dropdown } from "semantic-ui-react";
import { Pagination } from "@material-ui/lab";
import { fetchShoesList } from "../../redux/actions/shoesActions";

class ShoesList extends React.Component {
  state = {
    sortOptions: [
      { key: "most-recent", value: "most-recent", text: "Most recent" },
      { key: "high-to-low", value: "high-to-low", text: "Price: High-Low" },
      { key: "low-to-high", value: "low-to-high", text: "Price: Low-High" },
    ],
  };

  componentDidMount = () => {
    this.props.fetchShoesList(2);
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
        <Pagination count={numOfPages} />
      </StyledShoesList>
    );
  }
}

export default connect(({ shoes }) => ({ shoesList: shoes.shoesList }), {
  fetchShoesList,
})(ShoesList);
