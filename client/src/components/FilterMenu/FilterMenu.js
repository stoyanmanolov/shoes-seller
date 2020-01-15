import React from "react";
import axios from "axios";
import { Checkbox } from "semantic-ui-react";
import { FilterList, FilterItem, FilterOption } from "./FilterMenu-styles";

class FilterMenu extends React.Component {
  state = {
    items: [
      { title: "Category" },
      { title: "Brand" },
      { title: "Model" },
      { title: "Price" },
      { title: "Size" }
    ],
    itemsClicked: [],
    itemsData: {}
  };

  componentDidMount = () => {
    const itemsData = {};
    // Don't call the API for Price and Size
    const filteredItems = this.state.items.filter(
      item => item.title !== "Price" && item.title !== "Size"
    );

    // Get all the unique brands, categories etc. and how many times they were found in the database.
    filteredItems.forEach(item => {
      item.title = item.title.toLowerCase();
      axios.get(`/shoes/${item.title}`).then(response => {
        itemsData[item.title] = response.data;
      });

      this.setState({ itemsData });
    });
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
    const { items, itemsClicked, itemsData } = this.state;

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
      const itemData = itemsData[item.title];
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
          {clicked ? this.renderOptions(itemData, item.title, clicked) : null}
        </React.Fragment>
      );
    });
  };

  render() {
    return <FilterList>{this.renderItems()}</FilterList>;
  }
}

export default FilterMenu;
