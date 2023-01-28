import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFiltersData,
  selectFilter,
  removeSelectedFilter,
  clearSelectedFilters,
} from "../../redux/actions/shoesActions";
import { Button, Checkbox, Loader } from "semantic-ui-react";
import {
  StyledFilterMenu,
  FilterList,
  FilterSection,
  FilterOption,
  MobileWrapper,
} from "./FilterMenu.styles";
import PriceRange from "./components/PriceRange";
import { ShoesAPI } from "../../api";

export const FilterMenu = ({ gender = "All", forKids = false }) => {
  const [sectionsToggled, setSectionsToggled] = useState(["category", "brand"]);
  const [showOnSmallerScreens, setShowOnSmallerScreens] = useState(false);
  const filtersData = useSelector((state) => state.shoes.filtersData);
  const selectedFilters = useSelector((state) => state.shoes.selectedFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearSelectedFilters());

    ShoesAPI.getShoeFields(
      gender,
      forKids,
      Object.keys(selectedFilters).toString()
    ).then((response) => {
      dispatch(setFiltersData(response.data));
    });
  }, [gender, forKids]);

  const handleSectionClick = (nameToToggle, toggled) => {
    const newSectionsToggled = [...sectionsToggled];

    if (toggled) {
      // Remove from array of toggled sections
      newSectionsToggled.splice(sectionsToggled.indexOf(nameToToggle), 1);
    } else {
      // add
      newSectionsToggled.push(nameToToggle);
    }

    setSectionsToggled(newSectionsToggled);
  };

  const renderFilterOptions = (name, toggled) => {
    if (!filtersData) {
      return <Loader active inline size="small" />;
    }

    return (
      <ul className="info">
        {(() => {
          const filterData = filtersData[name];

          if (name === "price") {
            return (
              <PriceRange
                toggled={toggled}
                boundries={filterData}
                handlePriceChange={(price) => {
                  const selectedPrice = [price[0], price[1]];
                  dispatch(selectFilter(name, selectedPrice));
                }}
              />
            );
          } else {
            return filterData.map((data, index) => {
              return (
                <FilterOption toggled={toggled} key={index}>
                  <Checkbox
                    onChange={(e, { checked }) => {
                      if (checked) {
                        dispatch(selectFilter(name, data[name]));
                      } else if (!checked) {
                        dispatch(removeSelectedFilter(name, data[name]));
                      }
                    }}
                  />
                  <p>{data[name]}</p>
                  <span>{"(" + data.count + ")"}</span>
                </FilterOption>
              );
            });
          }
        })()}
      </ul>
    );
  };

  return (
    <StyledFilterMenu
      id="filter-menu"
      showOnSmallerScreens={showOnSmallerScreens}
    >
      <MobileWrapper>
        <Button
          fluid
          onClick={() => setShowOnSmallerScreens(!showOnSmallerScreens)}
        >
          FILTERS
        </Button>
      </MobileWrapper>
      <FilterList showOnSmallerScreens={showOnSmallerScreens}>
        {(() => {
          return Object.keys(selectedFilters).map((name, index) => {
            const toggled = sectionsToggled.includes(name);

            return (
              <React.Fragment key={index}>
                <FilterSection
                  onClick={(e) => handleSectionClick(name, toggled)}
                  toggled={toggled}
                >
                  <p>{name.toUpperCase()}</p>
                  <i
                    className={`fas fa-chevron-${!toggled ? "down" : "up"}`}
                  ></i>
                </FilterSection>
                {renderFilterOptions(name, toggled)}
              </React.Fragment>
            );
          });
        })()}
      </FilterList>
    </StyledFilterMenu>
  );
};

export default FilterMenu;
