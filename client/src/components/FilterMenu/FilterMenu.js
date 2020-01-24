import React from "react";
import { connect } from "react-redux";
import { fetchFilterOptions } from "../../redux/actions/shoesActions";
import { Checkbox } from "semantic-ui-react";
import { FilterList, FilterItem, FilterOption } from "./FilterMenu-styles";

class FilterMenu extends React.Component {
  state = {
    items: [
      { title: "category" },
      { title: "brand" },
      { title: "model" },
      { title: "price" },
      { title: "size" }
    ],
    itemsClicked: ["category", "brand"]
  };

  componentDidMount = () => {
    const filteredItems = this.state.items.filter(
      item => item.title !== "price" && item.title !== "size"
    );

    // Get all the unique brands, categories etc. and how many times they were found in the database.
    this.props.fetchFilterOptions(filteredItems);
  };

  renderOptions = (itemData, title) => {
    return (
      <>
        {itemData ? (
          <ul className="info">
            {itemData.map((data, index) => {
              return (
                <FilterOption key={index}>
                  <Checkbox></Checkbox>
                  <p>{data[title]}</p>
                  <p>{"(" + data.count + ")"}</p>
                </FilterOption>
              );
            })}
          </ul>
        ) : null}
      </>
    );
  };

  renderItems = () => {
    const { items, itemsClicked } = this.state;

    const handleClick = (e, title) => {
      e.preventDefault();
      const clicked = itemsClicked.includes(title);

      if (clicked) {
        // Remove from array of clicked items
        const index = itemsClicked.indexOf(title);
        itemsClicked.splice(index, 1);
      } else {
        // Add to array of clicked items
        itemsClicked.push(title);
      }
      this.setState({ itemsClicked });
    };

    return items.map((item, index) => {
      const itemData = this.props.filterOptions[item.title];
      const clicked = itemsClicked.includes(item.title);

      return (
        <React.Fragment key={index}>
          <FilterItem
            onClick={e => handleClick(e, item.title)}
            clicked={clicked}
            key={index}
          >
            <p className="title">{item.title.toUpperCase()}</p>
            {!clicked ? (
              <i className="chevron fas fa-chevron-down"></i>
            ) : (
              <>
                <i className="chevron fas fa-chevron-up"></i>
              </>
            )}
          </FilterItem>
          {clicked ? this.renderOptions(itemData, item.title) : null}
        </React.Fragment>
      );
    });
  };

  render() {
    if (!this.props.filterOptions) {
      return null;
    }
    return <FilterList>{this.renderItems()}</FilterList>;
  }
}

export default connect(
  ({ shoes }) => ({ filterOptions: shoes.filterOptions }),
  { fetchFilterOptions }
)(FilterMenu);
