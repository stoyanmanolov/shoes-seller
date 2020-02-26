import React from "react";
import { connect } from "react-redux";
import { fetchFilterOptions } from "../../redux/actions/shoesActions";
import { Checkbox } from "semantic-ui-react";
import { FilterList, FilterSection, FilterOption } from "./FilterMenu-styles";
import PriceRange from "./components/PriceRange";

export class FilterMenu extends React.Component {
  state = {
    sections: [
      { title: "category" },
      { title: "brand" },
      { title: "model" },
      { title: "color" },
      { title: "price" },
      { title: "sizes" }
    ],
    sectionsClicked: ["category", "brand"]
  };

  componentDidMount = () => {
    const filteredSections = this.state.sections.filter(
      section => section.title !== "price"
    );

    // Get all the unique brands, categories etc. and how many times they were found in the database.
    this.props.fetchFilterOptions(filteredSections);
  };

  renderFilterOptions = title => {
    if (!this.props.filterOptions) {
      return null;
    }
    const sectionData = this.props.filterOptions[title];

    return (
      <ul className="info">
        {title === "price" ? (
          <PriceRange />
        ) : (
          sectionData.map((data, index) => {
            return (
              <FilterOption key={index}>
                <Checkbox></Checkbox>
                <p className="title">{data[title]}</p>
                <p className="count">{"(" + data.count + ")"}</p>
              </FilterOption>
            );
          })
        )}
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
            onClick={e => handleClick(e, title)}
            clicked={clicked}
          >
            <p className="title">{title.toUpperCase()}</p>
            {!clicked ? (
              <i className="chevron fas fa-chevron-down"></i>
            ) : (
              <i className="chevron fas fa-chevron-up"></i>
            )}
          </FilterSection>
          {clicked ? this.renderFilterOptions(title) : null}
        </React.Fragment>
      );
    });
  };

  render() {
    return <FilterList>{this.renderFilterSections()}</FilterList>;
  }
}

export default connect(
  ({ shoes }) => ({ filterOptions: shoes.filterOptions }),
  { fetchFilterOptions }
)(FilterMenu);
