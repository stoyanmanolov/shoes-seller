import React from "react";
import { StyledSearch } from "./Search-styles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Input, List, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { ShoesAPI } from "../../../api";

export class Search extends React.Component {
  state = { toggled: false, input: "", matchingShoes: [] };

  handleClick = (e) => {
    this.setState({ toggled: !this.state.toggled });
  };

  handleChange = (e) => {
    this.setState({ input: e.target.value });

    ShoesAPI.searchShoes(e.target.value)
      .then((response) => this.setState({ matchingShoes: response.data }))
      .catch((error) => window.alert("There has been an error!"));
  };

  renderShoes = (shoes) => {
    if (shoes.length === 0 && this.state.input !== "") {
      return <p>No shoes found matching your input!</p>;
    }
    return (
      <List>
        {shoes.map((shoe, index) => {
          return (
            <List.Item id={shoe.model} key={index}>
              <Image avatar src={`/images/${shoe.frontImage}`} />
              <List.Content>
                <List.Header
                  as="a"
                  onClick={(e) => {
                    this.props.history.push(`/shoe/${shoe._id}`);
                    window.location.reload(true);
                    this.setState({ toggled: !this.state.toggled });
                  }}
                >
                  {shoe.brand + " " + shoe.model}
                </List.Header>
                <List.Description>
                  {shoe.forKids ? "Kids" : shoe.gender}
                </List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    );
  };

  render() {
    return (
      <StyledSearch>
        <button className="search-button" onClick={this.handleClick}>
          <i className="fas fa-search"></i>
        </button>
        <Modal isOpen={this.state.toggled} toggle={this.handleClick}>
          <ModalHeader toggle={this.handleClick}>
            <i style={{ marginRight: "5px" }} className="fas fa-search"></i>{" "}
            Search shoes
          </ModalHeader>
          <ModalBody>
            <Input
              fluid
              icon="search"
              placeholder="Search shoes..."
              onChange={this.handleChange}
              value={this.state.input}
            />
            {this.renderShoes(this.state.matchingShoes)}
          </ModalBody>
          <ModalFooter>
            <Button secondary onClick={this.handleClick}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </StyledSearch>
    );
  }
}

export default withRouter(Search);
