import React from "react";
import { connect } from "react-redux";
import {
  fetchFilterOptions,
  clearFilterOptions,
  addFilter,
  removeFilter,
} from "../../redux/actions/shoesActions";
import { Checkbox, Button, Loader } from "semantic-ui-react";
import {
  StyledFilterMenu,
  FilterList,
  FilterSection,
  FilterOption,
} from "./FilterMenu-styles";
import PriceRange from "./components/PriceRange";

export class FilterMenu extends React.Component {
  state = {
    sections: [
      { title: "category" },
      { title: "brand" },
      { title: "model" },
      { title: "color" },
      { title: "price" },
      { title: "sizes" },
    ],
    sectionsClicked: ["category", "brand"],
    showOnSmallerScreens: false,
  };

  componentDidMount = () => {
    // Get all the unique brands, categories etc. and how many times they were found in the database.
    this.props.fetchFilterOptions(
      this.props.gender,
      this.props.forKids,
      this.state.sections
    );
  };
  componentWillUnmount = () => {
    this.props.clearFilterOptions();
  };

  renderFilterOptions = (title, clicked) => {
    if (!this.props.filterOptions.optionNames) {
      return this.state.sectionsClicked.includes(title) ? (
        <Loader id="loader" active inline size="small" />
      ) : null;
    }
    const sectionData = this.props.filterOptions.optionNames[title];

    const renderPriceRange = () => {
      const getPrice = (price) => {
        const selectedPrice = [price[0], price[1]];
        this.props.addFilter(title, selectedPrice);
      };

      return (
        <PriceRange
          getPrice={getPrice}
          clicked={clicked}
          boundries={sectionData}
        />
      );
    };

    return (
      <ul className="info">
        {title === "price"
          ? renderPriceRange()
          : sectionData.map((data, index) => {
              return (
                <FilterOption clicked={clicked} key={index}>
                  <Checkbox
                    onChange={(e, { checked }) => {
                      if (checked) this.props.addFilter(title, data[title]);
                      else if (!checked)
                        this.props.removeFilter(title, data[title]);
                    }}
                  />
                  <p className="title">{data[title]}</p>
                  <p className="count">{"(" + data.count + ")"}</p>
                </FilterOption>
              );
            })}
      </ul>
    );
  };

  renderFilterSections = () => {
    const { sections, sectionsClicked } = this.state;

    const handleClick = (e, title) => {
      e.preventDefault();
      const clicked = sectionsClicked.includes(title);

      if (clicked) {
        // Remove from array of clicked sections
        const index = sectionsClicked.indexOf(title);
        sectionsClicked.splice(index, 1);
      } else {
        // Add to array of clicked sections
        sectionsClicked.push(title);
      }
      this.setState({ sectionsClicked });
    };

    return sections.map(({ title }, index) => {
      const clicked = sectionsClicked.includes(title);
      return (
        <React.Fragment key={index}>
          <FilterSection
            id={title}
            onClick={(e) => handleClick(e, title)}
            clicked={clicked}
          >
            <p className="title">{title.toUpperCase()}</p>
            {!clicked ? (
              <i className="chevron fas fa-chevron-down"></i>
            ) : (
              <i className="chevron fas fa-chevron-up"></i>
            )}
          </FilterSection>
          {this.renderFilterOptions(title, clicked)}
        </React.Fragment>
      );
    });
  };

  render() {
    const { showOnSmallerScreens } = this.state;

    const handleClick = () => {
      !showOnSmallerScreens
        ? this.setState({ showOnSmallerScreens: true })
        : this.setState({ showOnSmallerScreens: false });
    };

    return (
      <StyledFilterMenu
        id="filter-menu"
        showOnSmallerScreens={showOnSmallerScreens}
      >
        <div className="button-wrapper">
          <Button className="filter-button" onClick={() => handleClick()}>
            FILTERS
          </Button>
          <div className="filter-topbar">
            <h3>Filters</h3>
            <i
              id="close-X-icon"
              className="fas fa-times"
              onClick={() => handleClick()}
            ></i>
          </div>
        </div>
        <FilterList
          id="filter-list"
          showOnSmallerScreens={showOnSmallerScreens}
        >
          {this.renderFilterSections()}
        </FilterList>
      </StyledFilterMenu>
    );
  }
}

FilterMenu.defaultProps = {
  gender: "All",
  forKids: false,
};

export default connect(
  ({ shoes }) => ({ filterOptions: shoes.filterOptions }),
  {
    fetchFilterOptions,
    clearFilterOptions,
    addFilter,
    removeFilter,
  }
)(FilterMenu);
